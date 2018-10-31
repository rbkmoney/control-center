export class MetadataEnumMember {
    public name: string;
    public value: number;
    public doc: string;

    constructor(name?: string, value?: number, doc?: string) {
        this.name = name;
        this.value = value;
        this.doc = doc;
    }
}
