import { DomainGroup } from '../domain-group';
import { toJson } from '../../../shared/thrift-json-converter';
import { TableGroup, TableDataSource } from './model';

function shorten(str: string, limit = 150): string {
    return str.length > limit ? str.slice(0, limit) + '...' : str;
}

export function toTableGroup(domainGroup: DomainGroup[]): TableGroup[] {
    return domainGroup.map(({ name, objects }) => {
        return {
            name,
            tableItems: objects.map(o => {
                const json = toJson(o);
                const stringifiedRef = JSON.stringify(json.ref);
                const stringifiedData = JSON.stringify(json.data);
                const stringified = stringifiedRef + stringifiedData;
                const view = {
                    ref: shorten(stringifiedRef),
                    data: shorten(stringifiedData)
                };
                return { stringified, json, view };
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
                    tableItems.map(({ json, view: { ref, data }, stringified }) => ({
                        name,
                        ref,
                        data,
                        json,
                        stringified
                    }))
                ),
            []
        );
}
