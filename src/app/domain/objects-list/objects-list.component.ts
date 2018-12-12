import { Component, EventEmitter, Output } from '@angular/core';

import { DomainService } from '../domain.service';
import { Field, Type, TypeDef } from '../../metadata/metadata.service';
import { Node } from '../tree/model';


@Component({
    selector: 'cc-objects-list',
    templateUrl: 'objects-list.component.html',
    styleUrls: []
})
export class ObjectsListComponent {
    @Output()
    selectNode = new EventEmitter<{ node: Node, isJSON?: boolean }>();
    groups: { id: string, name: string, description: string }[] = [];

    constructor(private domainService: DomainService) {
        this.domainService.metadata$.subscribe((metadata: TypeDef) => this.updateGroups(metadata));
    }

    updateGroups(metadata: Type) {
        if (metadata) {
            console.log(metadata);
            this.groups = (metadata as any).type.valueType.fields.map((field: Field) => {
                const {name} = field;
                const nodes = this.domainService.node$.getValue().children.filter((child) => child.children[1].control.value === name);
                return {
                    id: name,
                    name: field.type.name,
                    description: nodes.length
                };
            });
        } else {
            this.groups = [];
        }
    }
}
