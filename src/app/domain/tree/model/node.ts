import { FormControl, Validators } from '@angular/forms';

import {
    Const,
    Enum,
    Exception,
    Field,
    MetadataService,
    MetaList,
    MetaMap,
    MetaSet,
    Simple,
    Struct,
    Structure,
    Type,
    TypeDef,
    Union
} from '../../../metadata/metadata.service';
import { stringify } from '../../../shared/stringify';

interface Params<T extends Structure = Type> {
    metadata?: T;
    field?: Field;
    initValue?: any;
    parent?: Node;
}

export function createNode(params: Params<Type> = {}) {
    const structure = params.metadata ? params.metadata.structure : params.parent.metadata.structure;
    switch (structure) {
        case 'typedef':
            return createNode({...params, metadata: (params.metadata as TypeDef).type});
        case 'const':
            return new ConstNode(params as Params<Const>);
        case 'enum':
            return new EnumNode(params as Params<Enum>);
        case 'struct':
            return new StructNode(params as Params<Struct>);
        case 'union':
            return new UnionNode(params as Params<Union>);
        case 'exception':
            return new ExceptionNode(params as Params<Exception>);
        case 'list':
            return new ListNode(params as Params<MetaList>);
        case 'set':
            return new SetNode(params as Params<MetaSet>);
        case 'map':
            return new MapNode(params as Params<MetaMap>);
        case 'bool':
            return new BoolNode(params as Params<Simple>);
        case 'int':
        case 'i8':
        case 'i16':
        case 'i32':
        case 'i64':
            return new IntNode(params as Params<Simple>);
        case 'double':
            return new DoubleNode(params as Params<Simple>);
        case 'string':
            return new StringNode(params as Params<Simple>);
        case 'binary':
            return new BinaryNode(params as Params<Simple>);
    }
    throw new Error('Unknown structure');
}

export enum CONTROL_TYPE {
    INPUT = 'input',
    SELECT = 'select',
    TOGGLE = 'toggle'
}

export class TypedControl extends FormControl {
    static TYPE: CONTROL_TYPE;
    type: CONTROL_TYPE;
    options?: { name: string, value: string | number | boolean }[];

    static fromType(type: CONTROL_TYPE) {
        const formControl = new TypedControl();
        formControl.type = type;
        return formControl;
    }
}

export abstract class Node<T extends Structure = Type> {
    field?: Field;
    parent?: Node;
    children?: Node[];
    add?: (value?: any) => any;
    control?: TypedControl;
    initValue?: any;
    isNull: boolean;

    protected constructor({metadata, field, initValue, parent}: Params<T> = {}) {
        this.metadata = metadata;
        this.field = field;
        this.initValue = initValue;
        this.parent = parent || null;
        this.isNull = this.isNullable && initValue === null;
    }

    private _metadata?: T;

    get metadata(): T {
        return this._metadata || this.parent.metadata as T;
    }

    set metadata(metadata: T) {
        this._metadata = metadata;
    }

    get isNullable() {
        return this.field && this.field.option === 'optional';
    }

    get isFake() {
        return !this._metadata;
    }

    get label() {
        return this.field ? `${this.fieldLabel} (${this.typeLabel})` : this.typeLabel;
    }

    get fieldLabel() {
        return this.field ? `${this.field.name}${this.field.option === 'required' ? '*' : ''}` : '';
    }

    get typeLabel() {
        return `${this.metadata.structure} ${this.metadata.name}`;
    }

    get isRef() {
        return this.metadata.name.slice(-3) === 'Ref';
    }

    get hasChildren() {
        return Boolean(Array.isArray(this.children) && this.children.length);
    }

    get icon() {
        return this.parent ? this.parent.getChildIcon(this as Node) : undefined;
    }

    abstract get value(): any;

    get isChanged(): boolean {
        if (this.isFake) {
            for (const child of this.children) {
                if (child.isChanged) {
                    return true;
                }
            }
            return false;
        }
        return !MetadataService.isEqualValue(this.extractData(), this.initValue);
    }

    get errorsCount(): number {
        let count = 0;
        if (!this.isNull) {
            if (this.control) {
                count += Number(this.control.invalid);
            }
            if (!count && Array.isArray(this.children)) {
                for (const child of this.children) {
                    count += child.errorsCount;
                }
            }
        }
        return count;
    }

    get valid(): boolean {
        return !this.errorsCount;
    }

    get isRemovable() {
        return Boolean(this.parent && this.parent.add);
    }

    getChildIcon(node?: Node): { name: string; color?: string } {
        return undefined;
    }

    findNode(refNode: Node): Node {
        if (this.parent && Array.isArray(this.parent.children) && this.parent.children.length >= 2 && this.eq(refNode)) {
            return this.parent;
        }
        let resultNode;
        if (this.children) {
            for (const child of this.children) {
                if (resultNode = child.findNode(refNode)) {
                    return resultNode;
                }
            }
        }
        return undefined;
    }

    eq(node: Node): boolean {
        return this.metadata === node.metadata && stringify(this.initValue) === stringify(node.initValue);
    }

    toString(value = this.value, level = 0) {
        if (value === null) {
            return 'null';
        }
        if (typeof value === 'object') {
            if (value instanceof Map) {
                if (level > 0) {
                    return '[...]';
                }
                return '[' + Array.from(value).map(([k, v]) => '[' + this.toString(k, level + 1) + ', ' + this.toString(v, level + 1) + ']').join(', ') + ']';
            } else if (Array.isArray(value)) {
                if (level > 0) {
                    return '[...]';
                }
                return '[' + value.map((v) => this.toString(v, level + 1)).join(', ') + ']';
            } else {
                if (level > 0) {
                    return '{...}';
                }
                return '{' + Object.keys(value).map((key) => {
                    return key + ': ' + this.toString(value[key], level + 1);
                }).join(', ') + '}';
            }
        }
        return String(value);
    }

    extractData() {
        return this.metadata.toThrift(this.value);
    }

    remove() {
        if (this.parent) {
            const idx = this.parent.children.findIndex((c) => c === this);
            return this.parent.children.splice(idx, 1);
        }
    }
}

export class EnumNode extends Node<Enum> {
    constructor(params: Params<Enum>) {
        super(params);
        const {metadata, initValue} = params;
        this.control = TypedControl.fromType(CONTROL_TYPE.SELECT);
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

export class UnionNode extends Node<Union> {
    constructor(params: Params<Union>) {
        super(params);
        const {metadata, initValue} = params;
        this.control = TypedControl.fromType(CONTROL_TYPE.SELECT);
        this.control.options = (metadata as Union).fields.map(({name}) => ({name, value: name}));
        this.control.valueChanges.subscribe((value) => {
            const childField: Field = (metadata as Union).fields.find(({name}) => name === value);
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
        this.control.setValue(initValue ? Object.keys(initValue).find((v) => initValue[v] !== null) : undefined);
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

export class BoolNode extends Node<Simple> {
    constructor(params: Params<Simple>) {
        super(params);
        this.control = TypedControl.fromType(CONTROL_TYPE.TOGGLE);
        this.control.setValue(params.initValue);
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        return this.control.value;
    }
}

export class IntNode extends Node<Simple> {
    constructor(params: Params<Simple>) {
        super(params);
        const {initValue, field} = params;
        const validators = [];
        if (field && field.option === 'required') {
            validators.push(Validators.required);
        }
        this.control = TypedControl.fromType(CONTROL_TYPE.INPUT);
        this.control.setValue(initValue ? String(initValue) : '');
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
        this.control = TypedControl.fromType(CONTROL_TYPE.INPUT);
        this.control.setValue(initValue ? String(initValue) : '');
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
        this.control = TypedControl.fromType(CONTROL_TYPE.INPUT);
        this.control.setValue(initValue ? String(initValue) : '');
        this.control.setValidators(validators);
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        return this.control.value;
    }
}

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
