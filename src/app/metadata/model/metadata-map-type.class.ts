import { MetadataType } from './metadata-type.class';
import { TypeName } from './type-name.enum';

export class MetadataMapType extends MetadataType {
    public keyTypeId: TypeName;
    public valueTypeId: TypeName;
    public keyType: MetadataType;
    public valueType: MetadataType;
}
