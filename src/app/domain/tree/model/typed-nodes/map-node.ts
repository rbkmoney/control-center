import { MetaMap } from '../../../../metadata/metadata.service';
import { Node, Params } from '../node';
import { createNode } from '../create-node';

export class MapNode extends Node<MetaMap> {
    createChild = (v = []) => {
        const item = createNode({parent: this, initValue: v});
        item.children = [
            createNode({metadata: this.metadata.keyType, initValue: v[0], parent: item}),
            createNode({metadata: this.metadata.valueType, initValue: v[1], parent: item})
        ];
        return item;
    };

    constructor(params: Params<MetaMap>) {
        super(params);
        const {initValue} = params;
        const children: Node[] = [];
        if (initValue && !this.isFake) {
            for (const item of Array.from(initValue) as any[][]) {
                children.push(this.createChild(item));
            }
            this.add = (v) => this.children.push(this.createChild(v));
        }
        this.children = children;
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        if (this.isFake) {
            return this.children.map((child) => child.value);
        }
        return this.children.map((child) => child.value);
    }

    getChildIcon(node) {
        if (node && !node.isFake) {
            if (this.children[0] === node) {
                return {name: 'stop', color: 'primary'};
            }
            return {name: 'vpn_key', color: 'accent'};
        }
        return {name: 'view_stream', color: 'primary'};
    }
}



