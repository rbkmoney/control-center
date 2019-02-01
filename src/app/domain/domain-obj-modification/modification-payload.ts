import { MonacoFile } from '../../monaco-editor/model';

export interface ModificationPayload {
    objectType: string;
    file: MonacoFile;
}
