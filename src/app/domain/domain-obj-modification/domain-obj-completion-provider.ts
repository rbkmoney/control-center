import {
    CompletionProvider,
    ITextModel,
    CancellationToken,
    Position,
    CompletionContext,
    CompletionList,
    ProviderResult
} from '../../monaco-editor/model';

export class DomainObjCompletionProvider implements CompletionProvider {
    get language() {
        return 'json';
    }

    provideCompletionItems(
        model: ITextModel,
        position: Position,
        context: CompletionContext,
        token: CancellationToken
    ): ProviderResult<CompletionList> {
        return {
            suggestions: [
                {
                    label: 'test',
                    kind: monaco.languages.CompletionItemKind.Text,
                    documentation: 'Set the language',
                    insertText: 'Ебало стяни!'
                }
            ]
        };
    }
}
