import { FormControl, Validators } from '@angular/forms';
import Int64 from 'thrift-ts/lib/int64';

import { Enum, Field, MetaList, MetaMap, MetaSet, Struct, Type, TypeDef, Union } from '../../metadata/metadata.service';
import { stringify } from '../../shared/stringify';

export type ListType = 'select' | 'toggle' | 'field';
export type Structure = 'list-item' | 'map-item' | 'map-key' | 'map-value';

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

    constructor(obj: Partial<Node> = {}) {
        this.set(obj);
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

    static fromType(type: Type, {field, structure, value, parent}: { field?: Field, structure?: Structure, value?: any, parent: Node }) {
        if (!type) {
            return undefined;
        }
        let node = new Node({
            structure,
            metadata: type,
            parent,
            field,
            initData: value
        });
        node.isNotNull = value !== null;
        switch (type.structure) {
            case 'typedef':
                node = Node.fromType((type as TypeDef).type, {field, value, parent});
                break;
            case 'const':
                // TODO
                break;
            case 'enum':
                node.set({
                    list: 'select',
                    select: {
                        options: (type as Enum).items.map((item) => ({name: item.name || String(item.value), value: item.value})),
                        selectionChange: ({value: v}) => {
                            node.select.selected = v;
                        },
                        selected: value
                    }
                });
                break;
            case 'struct':
                node.set({
                    children: (type as Struct).fields.map((childField) => Node.fromType(childField.type, {
                        field: childField,
                        value: value ? value[childField.name] : undefined,
                        parent: node
                    }))
                });
                break;
            case 'union':
                node.set({
                    list: 'select',
                    select: {
                        options: (type as Union).fields.map(({name}) => ({name, value: name})),
                        selectionChange: undefined,
                    }
                });
                const selectUnionChildren = (fieldName: string) => {
                    node.select.selected = fieldName;
                    const childField: Field = (type as Union).fields.find(({name}) => name === fieldName);
                    if (childField) {
                        node.children = [Node.fromType(childField.type, {field: childField, value: value ? value[fieldName] : undefined, parent: node})];
                    } else {
                        node.children = [];
                    }
                };
                selectUnionChildren(value ? Object.keys(value).find((v) => value[v] !== null) : undefined);
                node.select.selectionChange = ({value: v}) => selectUnionChildren(v);
                break;
            case 'exception':
                // not used
                break;
            case 'list':
                node.set({
                    children: (value || []).map((v) => {
                        return Node.fromType((type as MetaList).valueType, {
                            structure: 'list-item',
                            parent: node,
                            value: v
                        });
                    })
                });
                break;
            case 'set':
                node.set({
                    children: (value || []).map((v) => {
                        return Node.fromType((type as MetaSet).valueType, {
                            structure: 'list-item',
                            parent: node,
                            value: v
                        });
                    })
                });
                break;
            case 'map':
                const buildMapItem = (v = []) => {
                    const item = new Node({
                        structure: 'map-item',
                        metadata: type,
                        parent: node,
                        initData: v,
                        children: [
                            Node.fromType((type as MetaMap).keyType, {
                                structure: 'map-key',
                                value: v[0],
                                parent: node
                            }),
                            Node.fromType((type as MetaMap).valueType, {
                                structure: 'map-value',
                                value: v[1],
                                parent: node
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
                node.set({
                    children
                });
                break;
            case 'bool':
                node.set({
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
                node.set({
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
                node.set({
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
                node.set({
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
                node.set({
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
                node.set({
                    control: new FormControl(value ? String(value) : '', {validators}),
                    list: 'field'
                });
                break;
            }
        }
        return node;
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
                if (isNotNull) {
                    const model = this.metadata.model();
                    for (const child of this.children) {
                        model[child.field.name] = child.extractData();
                    }
                    result = model;
                } else {
                    result = null;
                }
                break;
            case 'union':
                if (isNotNull) {
                    const model = this.metadata.model();
                    for (const option of this.select.options) {
                        model[option.name] = option.value === this.select.selected && this.children && this.children[0]
                            ? this.children[0].extractData()
                            : null;
                    }
                    result = model;
                } else {
                    result = null;
                }
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
                result = isNotNull ? new Int64(Number(this.control.value)) : null;
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
