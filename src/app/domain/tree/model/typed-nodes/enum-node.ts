import { Enum } from '../../../../metadata/metadata.service';
import { Node, NODE_CONTROL_TYPE, Params } from '../node';

export class EnumNode extends Node<Enum> {
    constructor(params: Params<Enum>) {
        super(params);
        const {metadata, initValue} = params;
        this.initControl(NODE_CONTROL_TYPE.SELECT);
        this.control.setValue(initValue);
        this.control.options = metadata.items.map((item) => ({name: item.name || String(item.value), value: item.value}));
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        return this.control.value;
    }
}
