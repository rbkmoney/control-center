import { Field, Union } from '../../../../metadata/metadata.service';
import { Node, NODE_CONTROL_TYPE, Params } from '../node';
import { createNode } from '../create-node';

export class UnionNode extends Node<Union> {
    constructor(params: Params<Union>) {
        super(params);
        const {metadata, initValue} = params;
        this.initControl(NODE_CONTROL_TYPE.SELECT);
        this.control.options = metadata.fields.map(({name}) => ({name, value: name}));
        this.control.valueChanges.subscribe((value) => {
            const childField: Field = metadata.fields.find(({name}) => name === value);
            if (childField) {
                this.children = [createNode({
                    metadata: childField.type,
                    field: childField,
                    initValue: initValue ? initValue[value] : undefined,
                    parent: this
                })];
            } else {
                this.children = [];
            }
        });
        this.control.setValue(initValue ? Object.keys(initValue).find((v) => initValue[v] !== null) : null);
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        return this.control.options.reduce((obj, option) => {
            obj[option.name] = option.value === this.control.value && this.children && this.children[0]
                ? this.children[0].value
                : null;
            return obj;
        }, {});

    }
}
