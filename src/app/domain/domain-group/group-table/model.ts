import { DomainPair } from '../domain-group';

interface ViewDomainObject {
    ref: string;
    data: string;
}

interface TableItem {
    stringified: string;
    pair: DomainPair;
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
    pair: DomainPair;
    stringified: string;
}
