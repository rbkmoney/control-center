import { DomainGroup, DomainPair } from '../domain-group';
import { toJson } from '../../../shared/thrift-json-converter';
import { TableGroup, TableDataSource } from './model';

function shorten(str: string, limit = 150): string {
    return str.length > limit ? str.slice(0, limit) + '...' : str;
}

export function toTableGroup(domainGroup: DomainGroup[]): TableGroup[] {
    return domainGroup.map(({ name, pairs }) => {
        return {
            name,
            tableItems: pairs.map(p => {
                const pair = toJson(p);
                const stringifiedRef = JSON.stringify(pair.object.ref);
                const stringifiedData = JSON.stringify(pair.object.data);
                const stringified = stringifiedRef + stringifiedData;
                const view = {
                    ref: shorten(stringifiedRef),
                    data: shorten(stringifiedData)
                };
                return { stringified, pair, view };
            })
        };
    });
}

export function toDataSource(group: TableGroup[], selectedTypes: string[]): TableDataSource[] {
    return group
        .filter(({ name }) => selectedTypes.includes(name))
        .reduce(
            (acc, { name, tableItems }) =>
                acc.concat(
                    tableItems.map(({ pair, view: { ref, data }, stringified }) => ({
                        name,
                        ref,
                        data,
                        pair,
                        stringified
                    }))
                ),
            []
        );
}
