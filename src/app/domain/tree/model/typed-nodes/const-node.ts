import { Const } from '../../../../metadata/metadata.service';
import { Node, Params } from '../node';

// TODO
export class ConstNode extends Node<Const> {
    constructor(params: Params<Const>) {
        super(params);
        console.warn('TODO: ConstNode is not implemented');
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        return this.control.value;
    }
}
