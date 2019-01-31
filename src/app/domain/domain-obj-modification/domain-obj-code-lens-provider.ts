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
        return [
            {
                range: {
                    startLineNumber: 2,
                    startColumn: 1,
                    endLineNumber: 3,
                    endColumn: 1
                },
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
