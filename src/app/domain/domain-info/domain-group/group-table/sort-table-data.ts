import { MatSort } from '@angular/material/sort';
import isNumber from 'lodash-es/isNumber';

import { TableDataSource } from './model';

function strAsc(a: string, b: string): number {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
}

function strDes(a: string, b: string): number {
    if (a > b) {
        return -1;
    } else if (a < b) {
        return 1;
    } else {
        return 0;
    }
}

function numberAsc(a: number, b: number): number {
    return a - b;
}

function numberDes(a: number, b: number): number {
    return b - a;
}

function sortByStrField(
    fieldName: string,
    data: TableDataSource[],
    sort: MatSort
): TableDataSource[] {
    if (sort.direction === 'asc') {
        return data.sort((a, b) => strAsc(a[fieldName], b[fieldName]));
    }
    if (sort.direction === 'desc') {
        return data.sort((a, b) => strDes(a[fieldName], b[fieldName]));
    }
    return data;
}

function sortByRef(data: TableDataSource[], sort: MatSort) {
    if (sort.direction === 'asc') {
        return data.sort((a, b) => {
            if (isNumber(a.pair.object.ref.id)) {
                return numberAsc(a.pair.object.ref.id, b.pair.object.ref.id);
            }
            return strAsc(a.ref, b.ref);
        });
    }
    if (sort.direction === 'desc') {
        return data.sort((a, b) => {
            if (isNumber(a.pair.object.ref.id)) {
                return numberDes(a.pair.object.ref.id, b.pair.object.ref.id);
            }
            return strDes(a.ref, b.ref);
        });
    }
    return data;
}

export function sortData(data: TableDataSource[], sort: MatSort): TableDataSource[] {
    if (!sort.active) {
        return data;
    }
    if (sort.active === 'data') {
        return sortByStrField('data', data, sort);
    }
    if (sort.active === 'name') {
        return sortByStrField('name', data, sort);
    }
    if (sort.active === 'ref') {
        return sortByRef(data, sort);
    }
    return data;
}
