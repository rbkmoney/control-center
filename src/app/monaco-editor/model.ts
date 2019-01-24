export type MonacoEditorOptions = monaco.editor.IEditorOptions;

export interface MonacoFile {
    uri: string;
    content: string;
    language?: string;
}
