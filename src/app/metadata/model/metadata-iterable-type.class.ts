import { MetadataType } from './metadata-type.class';
import { TypeName } from './type-name.enum';

export class MetadataIterableType extends MetadataType {
    public elemTypeId: TypeName;
    public elemType: MetadataType;
}
