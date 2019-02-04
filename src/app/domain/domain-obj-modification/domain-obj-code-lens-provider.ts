import { parse } from '../../jsonc/json-parser';
import {
    CodeLensProvider,
    ITextModel,
    CancellationToken,
    ICodeLensSymbol,
    ProviderResult
} from '../../monaco-editor/model';

export class DomainObjCodeLensProvider implements CodeLensProvider {
    get language() {
        return 'json';
    }

    provideCodeLenses(
        model: ITextModel,
        token: CancellationToken
    ): ProviderResult<ICodeLensSymbol[]> {
        const parsed = parse(model.getValue());
        // console.log(parsed);
        const range = monaco.Range.fromPositions(model.getPositionAt(5), model.getPositionAt(8));
        return [
            {
                range,
                id: 'First Line',
                command: {
                    id: null,
                    title: 'DomainRef'
                }
            }
        ];
    }
    resolveCodeLens?(
        model: ITextModel,
        codeLens: ICodeLensSymbol,
        token: monaco.CancellationToken
    ): ProviderResult<ICodeLensSymbol> {
        return codeLens;
    }
}
