// eslint-disable-next-line @typescript-eslint/naming-convention
export type IEditorOptions = monaco.editor.IEditorOptions;
// eslint-disable-next-line @typescript-eslint/naming-convention
export type IDiffEditorOptions = monaco.editor.IDiffEditorOptions;
// eslint-disable-next-line @typescript-eslint/naming-convention
export type ITextModel = monaco.editor.ITextModel;
export type CancellationToken = monaco.CancellationToken;
export type ProviderResult<T> = monaco.languages.ProviderResult<T>;
// eslint-disable-next-line @typescript-eslint/naming-convention
export type IDisposable = monaco.IDisposable;
export type Position = monaco.Position;
export type CompletionList = monaco.languages.CompletionList;
export type CompletionContext = monaco.languages.CompletionContext;
export type CodeLensList = monaco.languages.CodeLensList;
export type CodeLens = monaco.languages.CodeLens;
// eslint-disable-next-line @typescript-eslint/naming-convention
export type IEditor = monaco.editor.IEditor;
// eslint-disable-next-line @typescript-eslint/naming-convention
export type IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
// eslint-disable-next-line @typescript-eslint/naming-convention
export type IStandaloneDiffEditor = monaco.editor.IStandaloneDiffEditor;

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
