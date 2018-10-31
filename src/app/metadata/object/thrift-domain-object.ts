import { ObjectMetadata } from './object-metadata';

export class ThriftDomainObject {
    public name: string;
    public ref: ObjectMetadata[];
    public data: ObjectMetadata[];
    public thriftObject: any;

    constructor(name?: string, ref?: ObjectMetadata[], data?: ObjectMetadata[], thriftObject?: any) {
        this.name = name;
        this.ref = ref;
        this.data = data;
        this.thriftObject = thriftObject;
    }
}
