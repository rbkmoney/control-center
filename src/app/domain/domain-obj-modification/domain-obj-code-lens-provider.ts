import { MetaTyped, JsonPosition } from '../../damsel-meta/model';
import { MetaType, MetaStruct } from '../../damsel-meta/model/index';
import {
    CodeLensProvider,
    ITextModel,
    CancellationToken,
    ICodeLensSymbol,
    ProviderResult
} from '../../monaco-editor/model';

export class DomainObjCodeLensProvider implements CodeLensProvider {
    private meta: MetaTyped;
    private lenses: ICodeLensSymbol[];

    get language() {
        return 'json';
    }

    setMeta(meta: MetaTyped) {
        this.meta = meta;
    }

    provideCodeLenses(
        model: ITextModel,
        token: CancellationToken
    ): ProviderResult<ICodeLensSymbol[]> {
        if (!this.meta) {
            return;
        }
        this.lenses = [];
        this.provideTyped(this.meta, model);
        return this.lenses;
    }

    resolveCodeLens?(
        model: ITextModel,
        codeLens: ICodeLensSymbol,
        token: monaco.CancellationToken
    ): ProviderResult<ICodeLensSymbol> {
        return codeLens;
    }

    private provideTyped(meta: MetaTyped, model: ITextModel) {
        switch (meta.type) {
            case MetaType.struct:
            case MetaType.union:
                this.provideStruct(meta as MetaStruct, model);
                break;
        }
    }

    private provideStruct(meta: MetaStruct, model: ITextModel) {
        if (meta.virgin) {
            return;
        }
        if (meta.position) {
            const symbol = this.prepareCodeLensSymbol(model, meta.position, meta.name);
            this.lenses.push(symbol);
        } else {
            console.warn('Meta range in not defined', meta);
        }
        for (const field of meta.fields) {
            this.provideTyped(field.meta as MetaTyped, model);
        }
    }

    private prepareCodeLensSymbol(
        model: ITextModel,
        { start, end }: JsonPosition,
        typeName: string
    ): ICodeLensSymbol {
        return {
            range: monaco.Range.fromPositions(model.getPositionAt(start), model.getPositionAt(end)),
            command: {
                id: typeName,
                title: typeName
            }
        };
    }
}
