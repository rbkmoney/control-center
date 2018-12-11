import { MetaList } from '../../../../metadata/metadata.service';
import { Node, Params } from '../node';
import { createNode } from '../create-node';

export class ListNode extends Node<MetaList> {
    createChild = (v: any) => createNode({
        metadata: this.metadata.valueType,
        parent: this,
        initValue: v
    });

    constructor(params: Params<MetaList>) {
        super(params);
        const {initValue} = params;
        this.children = (initValue || []).map(this.createChild);
        this.add = (v) => this.children.push(this.createChild(v));
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        return this.children.map((child) => child.value);
    }

    getChildIcon() {
        return {name: 'lens', color: 'primary'};
    }
}

export class SetNode extends ListNode {
}
