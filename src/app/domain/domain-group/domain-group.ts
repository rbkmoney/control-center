export interface AbstractDomainObject {
    ref: object;
    data: object;
}

export interface DomainGroup {
    name: string;
    objects: AbstractDomainObject[];
}
