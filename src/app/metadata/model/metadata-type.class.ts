import { TypeName } from './type-name.enum';

export class MetadataType {
    public typeId: TypeName;

    constructor(typeId?: TypeName) {
        this.typeId = typeId;
    }
}
