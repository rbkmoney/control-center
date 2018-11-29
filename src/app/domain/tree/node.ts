import { FormControl, Validators } from '@angular/forms';

import { Enum, Field, MetaList, MetaMap, MetaSet, Struct, Type, TypeDef, Union } from '../../metadata/metadata.service';
import { stringify } from '../../shared/stringify';

export type ListType = 'select' | 'toggle' | 'field';
export type Structure = 'list-item' | 'map-item' | 'map-key' | 'map-value';

interface Params {
    field?: Field;
    structure?: Structure;
    value?: any;
    parent?: Node;
}

export function createNode(metadata?: Type, params: Params = {}) {
    if (!metadata) {
        return new Node();
    }
    switch (metadata.structure) {
        case 'typedef':
            return createNode((metadata as TypeDef).type, params);
        case 'const':
            return new Node(metadata, params);
        case 'enum':
            return new Node(metadata, params);
        case 'struct':
            return new Node(metadata, params);
        case 'union':
            return new Node(metadata, params);
        case 'exception':
            return new Node(metadata, params);
        case 'list':
            return new Node(metadata, params);
        case 'set':
            return new Node(metadata, params);
        case 'map':
            return new Node(metadata, params);
        case 'bool':
            return new Node(metadata, params);
        case 'int':
        case 'i8':
        case 'i16':
        case 'i32':
        case 'i64':
            return new Node(metadata, params);
        case 'double':
            return new Node(metadata, params);
        case 'string':
            return new Node(metadata, params);
        case 'binary':
            return new Node(metadata, params);
        default: {
            return new Node(metadata, params);
        }
    }
}

export class Node {
    metadata: Type;
    field: Field;
    parent: Node;
    list?: ListType;
    structure?: Structure;
    control?: FormControl;
    children?: Node[];
    initData?: any;
    select?: {
        options: { name: string, value: string | number | boolean }[];
        selected?: string;
        selectionChange({value}): any;
    };
    isNotNull: boolean;

    constructor(metadata?: Type, {field, structure, value, parent}: Params = {}) {
        if (!metadata) {
            return;
        }
        this.set({
            structure,
            metadata,
            parent,
            field,
            initData: value
        });
        this.isNotNull = value !== null;
        switch (metadata.structure) {
            case 'const':
                // TODO
                break;
            case 'enum':
                this.set({
                    list: 'select',
                    select: {
                        options: (metadata as Enum).items.map((item) => ({name: item.name || String(item.value), value: item.value})),
                        selectionChange: ({value: v}) => {
                            this.select.selected = v;
                        },
                        selected: value
                    }
                });
                break;
            case 'struct':
                this.set({
                    children: (metadata as Struct).fields.map((childField) => createNode(childField.type, {
                        field: childField,
                        value: value ? value[childField.name] : undefined,
                        parent: this
                    }))
                });
                break;
            case 'union':
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
                        this.children = [createNode(childField.type, {field: childField, value: value ? value[fieldName] : undefined, parent: this})];
                    } else {
                        this.children = [];
                    }
                };
                selectUnionChildren(value ? Object.keys(value).find((v) => value[v] !== null) : undefined);
                this.select.selectionChange = ({value: v}) => selectUnionChildren(v);
                break;
            case 'exception':
                // not used
                break;
            case 'list':
                this.set({
                    children: (value || []).map((v) => {
                        return createNode((metadata as MetaList).valueType, {
                            structure: 'list-item',
                            parent: this,
                            value: v
                        });
                    })
                });
                break;
            case 'set':
                this.set({
                    children: (value || []).map((v) => {
                        return createNode((metadata as MetaSet).valueType, {
                            structure: 'list-item',
                            parent: this,
                            value: v
                        });
                    })
                });
                break;
            case 'map':
                const buildMapItem = (v = []) => {
                    const item = createNode();
                    item.set({
                        structure: 'map-item',
                        metadata: metadata,
                        parent: this,
                        initData: v,
                        children: [
                            createNode((metadata as MetaMap).keyType, {
                                structure: 'map-key',
                                value: v[0],
                                parent: item
                            }),
                            createNode((metadata as MetaMap).valueType, {
                                structure: 'map-value',
                                value: v[1],
                                parent: item
                            })
                        ]
                    });
                    return item;
                };
                const children: Node[] = [];
                if (value) {
                    for (const item of Array.from(value) as any[][]) {
                        children.push(buildMapItem(item));
                    }
                }
                this.set({
                    children
                });
                break;
            case 'bool':
                this.set({
                    control: new FormControl(value),
                    list: 'toggle'
                });
                break;
            case 'int':
            case 'i8':
            case 'i16':
            case 'i32':
            case 'i64': {
                const validators = [];
                if (field && field.option === 'required') {
                    validators.push(Validators.required);
                }
                this.set({
                    control: new FormControl(value ? String(value) : '', {validators}),
                    list: 'field'
                });
                break;
            }
            case 'double': {
                const validators = [];
                if (field && field.option === 'required') {
                    validators.push(Validators.required);
                }
                this.set({
                    control: new FormControl(value ? String(value) : '', {validators}),
                    list: 'field'
                });
                break;
            }
            case 'string': {
                const validators = [];
                if (field && field.option === 'required') {
                    validators.push(Validators.required);
                }
                this.set({
                    control: new FormControl(value ? String(value) : '', {validators}),
                    list: 'field'
                });
                break;
            }
            case 'binary': {
                const validators = [];
                if (field && field.option === 'required') {
                    validators.push(Validators.required);
                }
                this.set({
                    control: new FormControl(value ? String(value) : '', {validators}),
                    list: 'field'
                });
                break;
            }
            default: {
                const validators = [];
                if (field && field.option === 'required') {
                    validators.push(Validators.required);
                }
                this.set({
                    control: new FormControl(value ? String(value) : '', {validators}),
                    list: 'field'
                });
                break;
            }
        }
    }

    get isNullable() {
        return (this.field ? this.field.option !== 'optional' : true) || this.structure === 'map-item';
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
        return this.metadata === node.metadata && stringify(this.initData) === stringify(node.initData);
    }

    set(obj: Partial<Node>) {
        for (const name of Object.keys(obj)) {
            this[name] = obj[name];
        }
    }

    extractData() {
        let result: any;
        const isNotNull = this.field ? (this.field.option !== 'optional' || this.isNotNull) : true;
        switch (this.metadata.structure) {
            case 'const':
                // TODO
                break;
            case 'enum':
                result = isNotNull ? this.select.selected : null;
                break;
            case 'struct':
                result = isNotNull ? this.metadata.toThrift(this.children.reduce((obj, child) => {
                    obj[child.field.name] = child.extractData();
                    return obj;
                }, {})) : null;
                break;
            case 'union':
                result = isNotNull ? this.metadata.toThrift(this.select.options.reduce((obj, option) => {
                    obj[option.name] = option.value === this.select.selected && this.children && this.children[0]
                        ? this.children[0].extractData()
                        : null;
                    return obj;
                }, {})) : null;
                break;
            case 'exception':
                // TODO, but not used
                break;
            case 'list':
                result = isNotNull ? this.children.map((child) => child.extractData()) : null;
                break;
            case 'set':
                result = isNotNull ? this.children.map((child) => child.extractData()) : null;
                break;
            case 'map':
                if (this.structure === 'map-item') {
                    result = this.children.map((child) => child.extractData());
                } else {
                    result = isNotNull ? new Map(this.children.map((child) => child.extractData())) : null;
                }
                break;
            case 'bool':
                // TODO
                result = isNotNull ? this.control.value : null;
                break;
            case 'int':
            case 'i8':
            case 'i16':
            case 'i32':
                result = isNotNull && Number(this.control.value) === Number(this.control.value) ? Number(this.control.value) : null;
                break;
            case 'i64':
                result = isNotNull ? this.metadata.toThrift(Number(this.control.value)) : null;
                break;
            case 'double':
                result = isNotNull && Number(this.control.value) === Number(this.control.value) ? Number(this.control.value) : null;
                break;
            case 'string':
                result = isNotNull ? this.control.value : null;
                break;
            case 'binary':
                result = isNotNull ? this.control.value : null;
                break;
            default:
                console.error('Not mapped type');
                result = isNotNull ? this.control.value : null;
                break;
        }
        return result;
    }
}
