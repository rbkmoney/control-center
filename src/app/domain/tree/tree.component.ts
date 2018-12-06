import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { Type } from '../../metadata/metadata.service';
import { createNode, Node } from './node';

@Component({
    selector: 'cc-tree',
    templateUrl: 'tree.component.html',
    styleUrls: ['tree.component.css']
})
export class TreeComponent implements OnChanges {
    @Input()
    data?: any;
    @Input()
    metadata?: Type;
    @Input()
    model?: Node;
    @Input()
    expanded?: boolean;
    @Input()
    withoutRoot = false;

    @Output()
    foundNode: EventEmitter<Node> = new EventEmitter();

    expandedNodes: Map<Node, boolean> = new Map();

    constructor() {
        this.findNode = this.findNode.bind(this);
        this.toggle = this.toggle.bind(this);
        this.expandedByNode = this.expandedByNode.bind(this);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data && changes.metadata
            && (changes.data.previousValue !== changes.data.currentValue
                || changes.metadata.previousValue !== changes.metadata.currentValue)) {
            this.buildModel(changes.metadata.currentValue, changes.data.currentValue);
        }
        if (changes.model && changes.model.previousValue !== changes.model.currentValue) {
            this.updateModel(changes.model.currentValue);
        }
    }

    buildModel(metadata: Type, data: any) {
        this.model = createNode(metadata, {initValue: data});
    }

    updateModel(model: Node) {
        this.model = model;
    }

    findNode(refNode: Node) {
        if (this.foundNode && this.model) {
            const foundNode = this.model.findNode(refNode);
            if (foundNode) {
                this.foundNode.emit(foundNode);
            }
        }
    }

    toggle(node: Node, all?: boolean) {
        if (this.expandedByNode(node)) {
            this.expand(node, all);
        } else {
            this.rollUp(node, all);
        }
    }

    rollUp(node: Node, all?: boolean) {
        this.expandedNodes.set(node, true);
        if (all && node.children) {
            for (const child of node.children) {
                this.rollUp(child, true);
            }
        }
    }

    expand(node: Node, all?: boolean) {
        this.expandedNodes.delete(node);
        if (all && node.children) {
            for (const child of node.children) {
                this.expand(child, true);
            }
        }
    }

    expandedByNode(node: Node) {
        if (node === this.model) {
            if (this.withoutRoot) {
                return true;
            }
            if (this.expanded !== undefined) {
                return this.expanded;
            }
        }
        return !node.isNull && node.hasChildren && this.expandedNodes.get(node);
    }
}
