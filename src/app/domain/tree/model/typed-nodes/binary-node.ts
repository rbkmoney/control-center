import { Simple } from '../../../../metadata/metadata.service';
import { Node, Params } from '../node';

// TODO
export class BinaryNode extends Node<Simple> {
    constructor(params: Params<Simple>) {
        super(params);
        console.warn('TODO: BinaryNode is not implemented');
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        return this.control.value;
    }
}
