import {
    CompletionList,
    CompletionProvider,
    ITextModel,
    Position,
    ProviderResult,
} from '../../monaco-editor';

export class DomainObjCompletionProvider implements CompletionProvider {
    get language() {
        return 'json';
    }

    provideCompletionItems(model: ITextModel, position: Position): ProviderResult<CompletionList> {
        const word = model.getWordUntilPosition(position);
        const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
        };
        return {
            suggestions: [
                {
                    label: 'test',
                    kind: monaco.languages.CompletionItemKind.Text,
                    insertText: 'Test value',
                    range,
                },
            ],
        };
    }
}
