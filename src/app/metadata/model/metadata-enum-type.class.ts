import { MetadataType } from './metadata-type.class';
import { TypeName } from './type-name.enum';

export class MetadataEnumType extends MetadataType {

    public name: string;

    constructor(name?: string) {
        super(TypeName.enum);
        this.name = name;
    }
}
