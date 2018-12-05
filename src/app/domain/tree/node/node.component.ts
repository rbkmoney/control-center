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
    root = false;
    @Input()
    withoutRoot = false;
    @Input()
    expanded: (node: Node) => boolean;
    @Input()
    findNode: (node: Node) => void;
    @Input()
    toggle: (node: Node) => void;

    constructor() {
    }

    get disabled() {
        return !this.node.hasChildren || (!this.node.isNullable && !this.node.isNotNull);
    }

    get isRoot(): boolean {
        return this.root || !this.node.parent;
    }

    get isRenderRoot() {
        return (!this.isRoot || (this.isRoot && !this.withoutRoot)) && this.node.metadata.structure !== 'map';
    }
}
