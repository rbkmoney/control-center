import { FormControl, Validators } from '@angular/forms';

import { Enum, Field, MetaMap, MetaSet, Struct, Type, TypeDef, Union } from '../../metadata/metadata.service';
import { stringify } from '../../shared/stringify';

export type ListType = 'select' | 'toggle' | 'field';

interface Params {
    metadata?: Type;
    field?: Field;
    initValue?: any;
    parent?: Node;
}

export function createNode(params: Params = {}) {
    const structure = params.metadata ? params.metadata.structure : params.parent.metadata.structure;
    switch (structure) {
        case 'typedef':
            return createNode({...params, metadata: (params.metadata as TypeDef).type});
        case 'const':
            return new ConstNode(params);
        case 'enum':
            return new EnumNode(params);
        case 'struct':
            return new StructNode(params);
        case 'union':
            return new UnionNode(params);
        case 'exception':
            return new ExceptionNode(params);
        case 'list':
            return new ListNode(params);
        case 'set':
            return new SetNode(params);
        case 'map':
            return new MapNode(params);
        case 'bool':
            return new BoolNode(params);
        case 'int':
        case 'i8':
        case 'i16':
        case 'i32':
        case 'i64':
            return new IntNode(params);
        case 'double':
            return new DoubleNode(params);
        case 'string':
            return new StringNode(params);
        case 'binary':
            return new BinaryNode(params);
    }
    throw new Error('Unknown structure');
}

export abstract class Node {
    field?: Field;
    parent?: Node;
    list?: ListType;
    control?: FormControl;
    children?: Node[];
    select?: {
        options: { name: string, value: string | number | boolean }[];
        selected?: string;
        selectionChange({value}): any;
    };
    pair = false;
    add: (value?: any) => any;
    initValue?: any;
    isNull: boolean;
    icon?: { name: string; color?: string };

    protected constructor({metadata, field, initValue, parent}: Params = {}) {
        this._metadata = metadata;
        this.field = field;
        this.initValue = initValue;
        this.parent = parent || null;
        this.isNull = this.isNullable && initValue === null;
    }

    private _metadata?: Type;

    get metadata() {
        return this._metadata || this.parent.metadata;
    }

    set metadata(metadata: Type) {
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

    abstract get value(): any;

    get localValue() {
        if (this.isNull) {
            return null;
        }
        switch (this.metadata.structure) {
            case 'exception':
            case 'struct':
                return 'struct';
            case 'union':
                return 'union';
            case 'list':
            case 'set':
                return 'list';
            case 'map':
                if (this.isFake) {
                    return 'map-item';
                }
                return 'map';
            case 'enum':
                return String(this.select.selected);
            case 'const':
            case 'bool':
            case 'int':
            case 'i8':
            case 'i16':
            case 'i32':
            case 'i64':
            case 'double':
            case 'string':
            case 'binary':
                return this.control.value;
        }
        console.error('Not mapped type');
        return this.control.value;
    }

    get initLocalValue() {
        if (this.initValue === null) {
            return null;
        }
        if (this.initValue === undefined) {
            return undefined;
        }
        switch (this.metadata.structure) {
            case 'exception':
            case 'struct':
                return 'struct';
            case 'union':
                return 'union';
            case 'list':
            case 'set':
                return 'list';
            case 'map':
                if (this.isFake) {
                    return 'map-item';
                }
                return 'map';
            case 'enum':
                return String(this.initValue);
            case 'const':
            case 'bool':
            case 'int':
            case 'i8':
            case 'i16':
            case 'i32':
            case 'i64':
            case 'double':
            case 'string':
            case 'binary':
                return String(this.initValue);
        }
        console.error('Not mapped type');
        return String(this.initValue);
    }

    get isChanged() {
        return this.initLocalValue !== this.localValue;
    }

    get changesCount(): number {
        let count = +this.isChanged;
        if (!count && Array.isArray(this.children)) {
            for (const child of this.children) {
                count += child.changesCount;
            }
        }
        return count;
    }

    get valid(): boolean {
        if (this.control && this.control.invalid) {
            return false;
        }
        if (Array.isArray(this.children)) {
            for (const child of this.children) {
                if (!child.valid) {
                    return false;
                }
            }
        }
        return true;
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

    set(obj: Partial<Node>) {
        for (const name of Object.keys(obj)) {
            this[name] = obj[name];
        }
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
}

export class EnumNode extends Node {
    constructor(params: Params) {
        super(params);
        const {metadata, initValue} = params;
        this.set({
            list: 'select',
            select: {
                options: (metadata as Enum).items.map((item) => ({name: item.name || String(item.value), value: item.value})),
                selectionChange: ({value: v}) => {
                    this.select.selected = v;
                },
                selected: initValue
            }
        });
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        return this.select.selected;
    }
}

export class StructNode extends Node {
    constructor(params: Params) {
        super(params);
        const {metadata, initValue} = params;
        this.set({
            children: (metadata as Struct).fields.map((childField) => createNode({
                metadata: childField.type,
                field: childField,
                initValue: initValue ? initValue[childField.name] : undefined,
                parent: this
            }))
        });
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
    constructor(params: Params) {
        super(params);
        console.warn('TODO: ExceptionNode is not tested');
    }
}

export class UnionNode extends Node {
    constructor(params: Params) {
        super(params);
        const {metadata, initValue} = params;
        this.set({
            list: 'select',
            select: {
                options: (metadata as Union).fields.map(({name}) => ({name, value: name})),
                selectionChange: undefined,
            }
        });
        const selectUnionChildren = (fieldName: string) => {
            this.select.selected = fieldName;
            const childField: Field = (metadata as Union).fields.find(({name}) => name === fieldName);
            if (childField) {
                this.children = [createNode({
                    metadata: childField.type,
                    field: childField,
                    initValue: initValue ? initValue[fieldName] : undefined,
                    parent: this
                })];
            } else {
                this.children = [];
            }
        };
        selectUnionChildren(initValue ? Object.keys(initValue).find((v) => initValue[v] !== null) : undefined);
        this.select.selectionChange = ({value: v}) => selectUnionChildren(v);
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        return this.select.options.reduce((obj, option) => {
            obj[option.name] = option.value === this.select.selected && this.children && this.children[0]
                ? this.children[0].value
                : null;
            return obj;
        }, {});

    }
}

export class ListNode extends Node {
    createChild = (v: any) => {
        const child = createNode({
            metadata: (this.metadata as MetaSet).valueType,
            parent: this,
            initValue: v
        });
        child.icon = {name: 'lens'};
        return child;
    };

    constructor(params: Params) {
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
}

export class SetNode extends ListNode {
}

export class MapNode extends Node {
    metadata: MetaMap;
    createChild = (v = []) => {
        const item = createNode({parent: this, initValue: v});
        item.pair = true;
        item.children = [
            createNode({metadata: this.metadata.keyType, initValue: v[0], parent: item}),
            createNode({metadata: this.metadata.valueType, initValue: v[1], parent: item})
        ];
        item.children[0].icon = this.icon = {name: 'key'};
        item.children[1].icon = this.icon = {name: 'stop', color: 'accent'};
        return item;
    };

    constructor(params: Params) {
        super(params);
        const {initValue} = params;
        const children: Node[] = [];
        if (initValue && !this.isFake) {
            for (const item of Array.from(initValue) as any[][]) {
                children.push(this.createChild(item));
            }
        }
        this.children = children;
        this.add = (v) => this.children.push(this.createChild(v));
        if (this.isFake) {
            this.icon = {name: 'view_stream'};
        }
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        if (this.isFake) {
            return this.children.map((child) => child.value);
        }
        return new Map(this.children.map((child) => child.value));
    }
}

export class BoolNode extends Node {
    constructor(params: Params) {
        super(params);
        const {initValue} = params;
        this.set({
            control: new FormControl(initValue),
            list: 'toggle'
        });
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        return this.control.value;
    }
}

export class IntNode extends Node {
    constructor(params: Params) {
        super(params);
        const {initValue, field} = params;
        const validators = [];
        if (field && field.option === 'required') {
            validators.push(Validators.required);
        }
        this.set({
            control: new FormControl(initValue ? String(initValue) : '', {validators}),
            list: 'field'
        });
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        return this.control.value;
    }
}

export class DoubleNode extends Node {
    constructor(params: Params) {
        super(params);
        const {initValue, field} = params;
        const validators = [];
        if (field && field.option === 'required') {
            validators.push(Validators.required);
        }
        this.set({
            control: new FormControl(initValue ? String(initValue) : '', {validators}),
            list: 'field'
        });
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        return this.control.value;
    }
}

export class StringNode extends Node {
    constructor(params: Params) {
        super(params);
        const {initValue, field} = params;
        const validators = [];
        if (field && field.option === 'required') {
            validators.push(Validators.required);
        }
        this.set({
            control: new FormControl(initValue ? String(initValue) : '', {validators}),
            list: 'field'
        });
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        return this.control.value;
    }
}

// TODO
export class BinaryNode extends Node {
    constructor(params: Params) {
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
export class ConstNode extends Node {
    constructor(params: Params) {
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
