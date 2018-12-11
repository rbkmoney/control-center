import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { DomainService } from '../domain.service';
import { Type } from '../../metadata/metadata.service';
import { Node } from '../tree/model';

const FAKE_COLUMN = '__node';

@Component({
    selector: 'cc-objects-list',
    templateUrl: 'objects-list.component.html',
    styleUrls: ['objects-list.component.css']
})
export class ObjectsListComponent {
    @Output()
    selectNode = new EventEmitter<{node: Node, isJSON?: boolean}>();

    metadata: Type;
    node: Node;
    groups: any[] = [];

    constructor(private domainService: DomainService, private snackBar: MatSnackBar, private router: Router) {
        this.domainService.metadata$.subscribe((metadata) => this.updateNode(metadata, this.node));
        this.domainService.node$.subscribe((node) => this.updateNode(this.metadata, node));
    }

    updateNode(metadata: Type, node: Node) {
        this.metadata = metadata;
        this.node = node;
        if (node) {
            this.groups = (this.metadata as any).type.valueType.fields.map((field) => {
                const {name} = field;
                const nodes = this.node.children.filter((child) => child.children[1].control.value === name);
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
                return {
                    elements,
                    displayedColumns,
                    allColumns: [...displayedColumns, 'actions'],
                    name,
                    description: `${nodes.length}`
                };
            });
        }
    }

    routeToObject(node: Node) {
        this.router.navigateByUrl(`/domain/object/${this.domainService.getKey(node)}`);
    }

    selectNodeHandler(data: {node: Node, isJSON?: boolean}) {
        this.selectNode.emit(data);
    }
}
