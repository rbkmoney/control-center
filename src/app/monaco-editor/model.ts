export type IEditorOptions = monaco.editor.IEditorOptions;
export type ITextModel = monaco.editor.ITextModel;
export type CancellationToken = monaco.CancellationToken;
export type ProviderResult<T> = monaco.languages.ProviderResult<T>;
export type ICodeLensSymbol = monaco.languages.ICodeLensSymbol;

export interface MonacoFile {
    uri: string;
    content: string;
    language?: string;
}

export interface CodeLensProvider extends monaco.languages.CodeLensProvider {
    readonly language: string;
}
