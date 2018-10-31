import { ThriftDomainObject } from './thrift-domain-object';

export class ThriftDomainGroup {
    public name: string;
    public className: string;
    public objects: ThriftDomainObject[];

    constructor(name?: string, className?: string, objects?: ThriftDomainObject[]) {
        this.name = name;
        this.className = className;
        this.objects = objects;
    }
}
