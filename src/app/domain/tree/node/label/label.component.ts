import { Component, Input } from '@angular/core';

import { Node } from '../../node';
import { SimpleComplexStructure } from '../../../../metadata/metadata.service';

@Component({
    selector: 'cc-label',
    templateUrl: 'label.component.html'
})
export class LabelComponent {
    @Input()
    node: Node;

    constructor() {
    }

    get typeName() {
        if (this.node.metadata instanceof SimpleComplexStructure) {
            switch (this.node.metadata.structure) {
                case 'map':
                case 'list':
                case 'set':
                    return `${this.node.metadata.structure}${this.node.metadata.name}`;
                default:
                    return this.node.metadata.structure;
            }
        } else {
            return `${this.node.metadata.structure} ${this.node.metadata.name}`;
        }
    }
}
