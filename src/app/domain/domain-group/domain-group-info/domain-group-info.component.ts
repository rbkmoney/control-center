import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { AbstractDomainObject, DomainGroup } from '../domain-group';
import { DomainGroupInfoService } from './domain-group-info.service';
import { DomainObjectDetailsService } from '../../domain-object-details/domain-object-details.service';
import { toJson } from '../../../shared/thrift-json-converter';

interface ViewDomainObject {
    ref: string;
    data: string;
}

interface TableItem {
    stringified: string;
    json: AbstractDomainObject;
    view: ViewDomainObject;
}

interface TableGroup {
    name: string;
    tableItems: TableItem[];
}

interface TableDataSource {
    name: string;
    ref: string;
    data: string;
    json: AbstractDomainObject;
    stringified: string;
}

@Component({
    selector: 'cc-domain-group-info',
    templateUrl: './domain-group-info.component.html',
    styleUrls: ['./domain-group-info.component.scss'],
    providers: [DomainGroupInfoService]
})
export class DomainGroupInfoComponent implements OnInit, OnChanges {
    @Input() group: DomainGroup[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    dataSource: MatTableDataSource<TableDataSource> = new MatTableDataSource();
    cols = ['name', 'ref', 'data', 'details'];
    private tableGroup: TableGroup[];

    constructor(private domainObjectDetailsService: DomainObjectDetailsService) {}

    ngOnChanges(changes: SimpleChanges) {
        const { group } = changes;
        if (group && group.currentValue) {
            this.tableGroup = group.currentValue.map(({ name, objects }) => {
                return {
                    name,
                    tableItems: objects.map(o => {
                        const json = toJson(o);
                        const stringifiedRef = JSON.stringify(json.ref);
                        const stringifiedData = JSON.stringify(json.data);
                        const stringified = stringifiedRef + stringifiedData;
                        const view = {
                            ref:
                                stringifiedRef.length > 150
                                    ? stringifiedRef.slice(0, 150) + '...'
                                    : stringifiedRef,
                            data:
                                stringifiedData.length > 150
                                    ? stringifiedData.slice(0, 150) + '...'
                                    : stringifiedData
                        };
                        return { stringified, json, view };
                    })
                };
            });
        }
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = ({ stringified }: TableDataSource, filter: string) => {
            let regexp;
            try {
                regexp = new RegExp(filter, 'g');
            } catch {
                return false;
            }
            const matched = stringified.match(regexp);
            return matched && matched.length > 0;
        };
        this.dataSource.sortData = (data: TableDataSource[], sort: MatSort) => {
            if (!sort.active) {
                return data;
            }
            return data;
        };
    }

    openDetails(obj: AbstractDomainObject) {
        this.domainObjectDetailsService.open(obj);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim();
    }

    typeSelectionChange(selectedTypes: string[]) {
        this.dataSource.data = this.tableGroup
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
}
