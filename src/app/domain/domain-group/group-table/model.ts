import { AbstractDomainObject } from '../domain-group';

interface ViewDomainObject {
    ref: string;
    data: string;
}

interface TableItem {
    stringified: string;
    json: AbstractDomainObject;
    view: ViewDomainObject;
}

export interface TableGroup {
    name: string;
    tableItems: TableItem[];
}

export interface TableDataSource {
    name: string;
    ref: string;
    data: string;
    json: AbstractDomainObject;
    stringified: string;
}
