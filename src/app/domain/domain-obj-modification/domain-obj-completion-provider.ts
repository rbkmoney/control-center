import { CompletionList, CompletionProvider, ProviderResult } from '../../monaco-editor';

export class DomainObjCompletionProvider implements CompletionProvider {
    get language() {
        return 'json';
    }

    provideCompletionItems(): ProviderResult<CompletionList> {
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
