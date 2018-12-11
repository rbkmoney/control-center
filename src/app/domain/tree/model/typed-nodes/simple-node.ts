import { Validators } from '@angular/forms';

import { Simple } from '../../../../metadata/metadata.service';
import { Node, NODE_CONTROL_TYPE, Params } from '../node';

export class IntNode extends Node<Simple> {
    constructor(params: Params<Simple>) {
        super(params);
        const {initValue, field} = params;
        const validators = [];
        if (field && field.option === 'required') {
            validators.push(Validators.required);
        }
        this.initControl(NODE_CONTROL_TYPE.INPUT);
        this.control.setValue(initValue);
        this.control.setValidators(validators);
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        return this.control.value;
    }
}

export class DoubleNode extends Node<Simple> {
    constructor(params: Params<Simple>) {
        super(params);
        const {initValue, field} = params;
        const validators = [];
        if (field && field.option === 'required') {
            validators.push(Validators.required);
        }
        this.initControl(NODE_CONTROL_TYPE.INPUT);
        this.control.setValue(initValue);
        this.control.setValidators(validators);
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        return this.control.value;
    }
}

export class StringNode extends Node<Simple> {
    constructor(params: Params<Simple>) {
        super(params);
        const {initValue, field} = params;
        const validators = [];
        if (field && field.option === 'required') {
            validators.push(Validators.required);
        }
        this.initControl(NODE_CONTROL_TYPE.INPUT);
        this.control.setValue(initValue);
        this.control.setValidators(validators);
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        return this.control.value;
    }
}
