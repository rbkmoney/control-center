import { MetadataField } from './metadata-field.class';
import { MetadataNamespace } from './metadata-namespace.enum';

export class MetadataObject {
    public name: string;
    public doc: string;
    public isException: boolean;
    public isUnion: boolean;
    public fields: MetadataField[];
    public namespace: MetadataNamespace;
    public isRef: boolean;
}
