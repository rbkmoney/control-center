import { Component, Input } from '@angular/core';

import { CONTROL_TYPE, Node } from '../model';

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
    controlTypes = CONTROL_TYPE;

    constructor() {
    }

    get expandButtonDisabled() {
        return !this.node.hasChildren || this.node.isNull;
    }

    get isRoot(): boolean {
        return this.root || !this.node.parent;
    }

    get isRenderRoot() {
        return !this.isRoot || (this.isRoot && !this.withoutRoot);
    }

    get expandIcon() {
        if (this.node.hasChildren) {
            return {name: this.expanded(this.node) ? 'expand_more' : 'chevron_right'};
        } else if (this.node.icon) {
            return this.node.icon;
        }
        return {name: ''};
    }

    get badgeIcon() {
        if (this.node.icon && this.expandIcon && this.expandIcon.name !== this.node.icon.name) {
            return this.node.icon;
        }
    }

    get expandAllIcon() {
        if (this.node.hasChildren) {
            return this.expanded(this.node) ? 'arrow_upward' : 'arrow_downward';
        }
        return '';
    }

    get isRenderChildren() {
        return this.expanded(this.node) || !this.isRenderRoot;
    }
}
