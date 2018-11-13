import { Component, Input } from '@angular/core';

import { Node } from '../node';

@Component({
    selector: 'cc-node',
    templateUrl: 'node.component.html',
    styleUrls: ['node.component.css']
})
export class NodeComponent {
    @Input()
    node: Node;
    @Input()
    expanded = false;
    @Input()
    root = false;

    constructor() {
    }

    get hasChildren() {
        return Boolean(Array.isArray(this.node.children) && this.node.children.length);
    }

    get isListKey() {
        return ['list-item', 'map-key'].includes(this.node.structure);
    }

    toggle(node: Node) {
        node.isExpanded = !node.isExpanded;
    }
}
