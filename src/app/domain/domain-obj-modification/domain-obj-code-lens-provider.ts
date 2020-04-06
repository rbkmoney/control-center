import {
    CancellationToken,
    CodeLensProvider,
    ICodeLensSymbol,
    ITextModel,
    ProviderResult
} from '../../monaco-editor';

export class DomainObjCodeLensProvider implements CodeLensProvider {
    get language() {
        return 'json';
    }

    provideCodeLenses(
        model: ITextModel,
        token: CancellationToken
    ): ProviderResult<ICodeLensSymbol[]> {
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
