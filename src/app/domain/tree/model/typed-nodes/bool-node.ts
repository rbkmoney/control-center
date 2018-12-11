import { Simple } from '../../../../metadata/metadata.service';
import { Node, NODE_CONTROL_TYPE, Params } from '../node';

export class BoolNode extends Node<Simple> {
    constructor(params: Params<Simple>) {
        super(params);
        this.initControl(NODE_CONTROL_TYPE.TOGGLE);
        this.control.setValue(params.initValue);
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        return this.control.value;
    }
}
