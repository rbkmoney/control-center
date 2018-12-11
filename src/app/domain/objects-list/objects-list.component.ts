import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { DomainService } from '../domain.service';
import { Type } from '../../metadata/metadata.service';
import { Node } from '../tree/model';


@Component({
    selector: 'cc-objects-list',
    templateUrl: 'objects-list.component.html',
    styleUrls: []
})
export class ObjectsListComponent {
    @Output()
    selectNode = new EventEmitter<{ node: Node, isJSON?: boolean }>();
    metadata: Type;
    groups: { id: string, name: string, description: string }[] = [];

    constructor(private domainService: DomainService, private snackBar: MatSnackBar, private router: Router) {
        this.domainService.metadata$.subscribe((metadata) => this.updateNode(metadata));
    }

    updateNode(metadata: Type) {
        this.metadata = metadata;
        if (metadata) {
            this.groups = (this.metadata as any).type.valueType.fields.map((field) => {
                const {name} = field;
                const nodes = this.domainService.node$.getValue().children.filter((child) => child.children[1].control.value === name);
                return {
                    name,
                    id: name,
                    description: nodes.length
                };
            });
        }
    }
}
