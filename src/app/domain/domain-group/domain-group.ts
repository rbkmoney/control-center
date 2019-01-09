export interface AbstractDomainObject {
    ref: any;
    data: any;
}

export interface DomainGroup {
    name: string;
    objects: AbstractDomainObject[];
}
