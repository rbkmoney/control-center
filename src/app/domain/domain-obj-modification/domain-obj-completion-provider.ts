import {
    CancellationToken,
    CompletionContext,
    CompletionList,
    CompletionProvider,
    ITextModel,
    Position,
    ProviderResult,
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
                    insertText: 'Test value',
                },
            ],
        };
    }
}
