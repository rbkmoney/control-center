import { TypeName } from './type-name.enum';
import { Required } from './required.enum';
import { MetadataType } from './metadata-type.class';

export class MetadataField {
    public key: number;
    public name: string;
    public doc: string;
    public required: Required;
    public typeId: TypeName;
    public type: MetadataType;
}
