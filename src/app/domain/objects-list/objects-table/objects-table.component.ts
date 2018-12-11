import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { DomainService } from '../../domain.service';
import { Type } from '../../../metadata/metadata.service';
import { Node } from '../../tree/model';

const FAKE_COLUMN = '__node';

@Component({
    selector: 'cc-objects-table',
    templateUrl: 'objects-table.component.html',
    styleUrls: ['objects-table.component.css']
})
export class ObjectsTableComponent implements OnInit {
    @Input()
    name: string;

    @Input()
    selectNode: EventEmitter<{ node: Node, isJSON?: boolean }>;

    metadata: Type;
    node: Node;
    group: any;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    constructor(private domainService: DomainService, private snackBar: MatSnackBar, private router: Router) {
    }

    ngOnInit() {
        this.domainService.metadata$.subscribe((metadata) => this.updateNode(metadata, this.node));
        this.domainService.node$.subscribe((node) => this.updateNode(this.metadata, node));
    }

    updateNode(metadata: Type, node: Node) {
        this.metadata = metadata;
        this.node = node;
        if (node) {
            const nodes = this.node.children.filter((child) => child.children[1].control.value === this.name);
            const elements = nodes.map((n) => {
                const res = {} as any;
                for (const child of n.children[1].children[0].children) {
                    for (const c of child.children) {
                        res[child.field.name + '.' + c.field.name] = c;
                    }
                }
                res[FAKE_COLUMN] = n;
                return res;
            });
            const displayedColumns = elements[0] ? Object.keys(elements[0] || {}) : [];
            displayedColumns.splice(displayedColumns.findIndex((c) => c === FAKE_COLUMN), 1);
            const dataSource = new MatTableDataSource(elements);
            dataSource.paginator = this.paginator;
            this.group = {
                elements: dataSource,
                displayedColumns,
                allColumns: [...displayedColumns, 'actions'],
                name: this.name,
                description: `${nodes.length}`
            };
        }
    }

    routeToObject(node: Node) {
        this.router.navigateByUrl(`/domain/object/${this.domainService.getKey(node)}`);
    }

    selectNodeHandler(data: { node: Node, isJSON?: boolean }) {
        this.selectNode.emit(data);
    }
}
