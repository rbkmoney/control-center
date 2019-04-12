import { MonacoFile } from '../../monaco-editor/model';

export interface ModificationPayload {
    file: MonacoFile;
    objectType: string;
}
