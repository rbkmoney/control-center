import { FormControl, Validators } from '@angular/forms';

import { Enum, Field, MetaMap, MetaSet, Struct, Type, TypeDef, Union } from '../../metadata/metadata.service';
import { stringify } from '../../shared/stringify';

export type ListType = 'select' | 'toggle' | 'field';
export type Structure = 'list-item' | 'map-item' | 'map-key' | 'map-value';

interface Params {
    field?: Field;
    structure?: Structure;
    initValue?: any;
    parent?: Node;
}

export function createNode(metadata: Type, params: Params = {}) {
    switch (metadata.structure) {
        case 'typedef':
            return createNode((metadata as TypeDef).type, params);
        case 'const':
            return new ConstNode(metadata, params);
        case 'enum':
            return new EnumNode(metadata, params);
        case 'struct':
            return new StructNode(metadata, params);
        case 'union':
            return new UnionNode(metadata, params);
        case 'exception':
            return new ExceptionNode(metadata, params);
        case 'list':
            return new ListNode(metadata, params);
        case 'set':
            return new SetNode(metadata, params);
        case 'map':
            return new MapNode(metadata, params);
        case 'bool':
            return new BoolNode(metadata, params);
        case 'int':
        case 'i8':
        case 'i16':
        case 'i32':
        case 'i64':
            return new IntNode(metadata, params);
        case 'double':
            return new DoubleNode(metadata, params);
        case 'string':
            return new StringNode(metadata, params);
        case 'binary':
            return new BinaryNode(metadata, params);
    }
    throw new Error('Unknown structure');
}

export abstract class Node {
    metadata: Type;
    field: Field;
    parent: Node;
    list?: ListType;
    structure?: Structure;
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

    constructor(metadata: Type, {field, structure, initValue, parent}: Params = {}) {
        if (!metadata) {
            return;
        }
        this.set({
            metadata,
            field,
            structure,
            initValue,
            parent
        });
        this.isNull = this.isNullable && initValue === null;
    }

    get isNullable() {
        return this.field && this.field.option === 'optional';
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
                if (this.structure === 'map-item') {
                    return 'map-item';
                } else {
                    return 'map';
                }
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
                if (this.structure === 'map-item') {
                    return 'map-item';
                } else {
                    return 'map';
                }
            case 'enum':
                return  String(this.initValue);
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
    constructor(metadata: Type, params: Params) {
        super(metadata, params);
        const {initValue} = params;
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
    constructor(metadata: Type, params: Params) {
        super(metadata, params);
        const {initValue} = params;
        this.set({
            children: (metadata as Struct).fields.map((childField) => createNode(childField.type, {
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
    constructor(metadata: Type, params: Params) {
        super(metadata, params);
        console.warn('TODO: ExceptionNode is not tested');
    }
}

export class UnionNode extends Node {
    constructor(metadata: Type, params: Params) {
        super(metadata, params);
        const {initValue} = params;
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
                this.children = [createNode(childField.type, {field: childField, initValue: initValue ? initValue[fieldName] : undefined, parent: this})];
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
    constructor(metadata: Type, params: Params) {
        super(metadata, params);
        const {initValue} = params;
        const create = (v: any) => {
            return createNode((metadata as MetaSet).valueType, {
                structure: 'list-item',
                parent: this,
                initValue: v
            });
        };
        this.set({
            children: (initValue || []).map(create),
            add: (v) => this.children.push(create(v))
        });
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
    constructor(metadata: Type, params: Params) {
        super(metadata, params);
        const {initValue} = params;
        const create = (v = []) => {
            const item = createNode(metadata);
            item.set({
                pair: true,
                structure: 'map-item',
                parent: this,
                initValue: v,
                children: [
                    createNode((metadata as MetaMap).keyType, {
                        structure: 'map-key',
                        initValue: v[0],
                        parent: item
                    }),
                    createNode((metadata as MetaMap).valueType, {
                        structure: 'map-value',
                        initValue: v[1],
                        parent: item
                    })
                ]
            });
            return item;
        };
        const children: Node[] = [];
        if (initValue) {
            for (const item of Array.from(initValue) as any[][]) {
                children.push(create(item));
            }
        }
        this.set({
            children,
            add: (v) => this.children.push(create(v))
        });
    }

    get value() {
        if (this.isNull) {
            return null;
        }
        if (this.structure === 'map-item') {
            return this.children.map((child) => child.value);
        } else {
            return new Map(this.children.map((child) => child.value));
        }
    }
}

export class BoolNode extends Node {
    constructor(metadata: Type, params: Params) {
        super(metadata, params);
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
    constructor(metadata: Type, params: Params) {
        super(metadata, params);
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
    constructor(metadata: Type, params: Params) {
        super(metadata, params);
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
    constructor(metadata: Type, params: Params) {
        super(metadata, params);
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
    constructor(metadata: Type, params: Params) {
        super(metadata, params);
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
    constructor(metadata: Type, params: Params) {
        super(metadata, params);
        console.warn('TODO: ConstNode is not implemented');
    }


    get value() {
        if (this.isNull) {
            return null;
        }
        return this.control.value;
    }
}
