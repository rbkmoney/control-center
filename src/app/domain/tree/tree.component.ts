import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { Type } from '../../metadata/metadata.service';
import { Node } from './node';

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

    @Output()
    foundNode: EventEmitter<Node> = new EventEmitter();

    expandedNodes: Map<Node, boolean> = new Map();

    constructor() {
        this.findNode = this.findNode.bind(this);
        this.toggle = this.toggle.bind(this);
        this.expanded = this.expanded.bind(this);
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
        console.time('view model');
        this.model = Node.fromType(metadata, {value: data, parent: undefined});
        console.dir(this.model);
        console.timeEnd('view model');

        console.time('view model serialize');
        console.dir(this.model.extractData());
        console.timeEnd('view model serialize');
        console.dir(data);
    }

    updateModel(model: Node) {
        this.model = model;
    }

    findNode(refNode: Node) {
        if (this.foundNode) {
            this.foundNode.emit(this.model ? this.model.findNode(refNode) : undefined);
        }
    }

    toggle(node: Node) {
        if (this.expandedNodes.get(node)) {
            this.expandedNodes.delete(node);
        } else {
            this.expandedNodes.set(node, true);
        }
    }

    expanded(node: Node) {
        return this.expandedNodes.get(node);
    }
}
