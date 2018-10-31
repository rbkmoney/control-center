import { MetadataType } from './metadata-type.class';
import { TypeName } from './type-name.enum';

export class MetadataReferenceType extends MetadataType {
    public className: string;

    constructor(typeId?: TypeName, className?: string) {
        super(typeId);
        this.className = className;
    }
}
