export type IEditorOptions = monaco.editor.IEditorOptions;
export type ITextModel = monaco.editor.ITextModel;
export type CancellationToken = monaco.CancellationToken;
export type ProviderResult<T> = monaco.languages.ProviderResult<T>;
export type ICodeLensSymbol = monaco.languages.ICodeLensSymbol;
export type IDisposable = monaco.IDisposable;
export type Position = monaco.Position;
export type CompletionList = monaco.languages.CompletionList;
export type CompletionContext = monaco.languages.CompletionContext;

export interface MonacoFile {
    uri: string;
    content: string;
    language?: string;
}

export interface LanguageProvider {
    readonly language: string;
}

export interface CodeLensProvider extends monaco.languages.CodeLensProvider, LanguageProvider {}

export interface CompletionProvider
    extends monaco.languages.CompletionItemProvider,
        LanguageProvider {}
