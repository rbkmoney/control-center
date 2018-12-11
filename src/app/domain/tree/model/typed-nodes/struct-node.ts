import { Struct, Exception } from '../../../../metadata/metadata.service';
import { Node, Params } from '../node';
import { createNode } from '../create-node';

export class StructNode extends Node<Struct> {
    constructor(params: Params<Struct>) {
        super(params);
        const {metadata, initValue} = params;
        this.children = metadata.fields.map((childField) => createNode({
            metadata: childField.type,
            field: childField,
            initValue: initValue ? initValue[childField.name] : undefined,
            parent: this
        }));
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        return this.children.reduce((obj, child) => {
            obj[child.field.name] = child.value;
            return obj;
        }, {});
    }
}

// TODO
export class ExceptionNode extends StructNode {
    constructor(params: Params<Exception>) {
        super(params);
        console.warn('TODO: ExceptionNode is not tested');
    }
}
