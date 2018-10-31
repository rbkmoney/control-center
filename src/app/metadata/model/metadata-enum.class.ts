import { MetadataEnumMember } from './metadata-enum-member.class';

export class MetadataEnum {
    public name: string;
    public members: MetadataEnumMember[];

    constructor(name?: string, members?: MetadataEnumMember[]) {
        this.name = name;
        this.members = members;
    }
}
