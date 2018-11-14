import { FormControl } from '@angular/forms';

import { Enum, Field, MetaList, MetaMap, MetaSet, Struct, Type, TypeDef, Union } from '../../metadata/metadata.service';

export type ListType = 'select' | 'toggle' | 'field';
export type Structure = 'list-item' | 'map-key' | 'map-value';

export class Node {
    metadata: Type;
    field: Field;
    parent: Node;
    label: string;
    list?: ListType;
    structure?: Structure;
    control?: FormControl;
    children?: Node[];
    select?: {
        options: { name: string, value: string | number | boolean }[];
        selected?: string;
        selectionChange({value}): any;
    };

    constructor() {
    }

    get isRef() {
        return this.metadata.name.slice(-3) === 'Ref';
    }

    static fromType(type: Type, {field, structure, value, parent}: { field?: Field, structure?: Structure, value?: any, parent: Node }) {
        if (!type) {
            return undefined;
        }
        let node = new Node();
        node.label = (field ? field.name + (field.option === 'required' ? '*' : '') + ' (' + type.name + ')' : type.name) + ` [${type.structure}]`;
        node.structure = structure;
        node.metadata = type;
        node.parent = parent;
        node.field = field;
        switch (type.structure) {
            case 'typedef':
                node = Node.fromType((type as TypeDef).type, {field, value, parent});
                break;
            case 'const':
                // TODO
                break;
            case 'enum':
                node.set({
                    control: new FormControl(''),
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
                        node.children = [Node.fromType(childField.type, {field: childField, value: value[fieldName], parent: node})];
                    } else {
                        node.children = [];
                    }
                };
                selectUnionChildren(value ? Object.keys(value).find((v) => !!value[v]) : undefined);
                node.select.selectionChange = ({value: v}) => selectUnionChildren(v);
                break;
            case 'exception':
                // not used
                break;
            case 'list':
                node.set({
                    ...node,
                    children: [
                        Node.fromType((type as MetaList).valueType, {field: {name: 'value', option: 'required'} as Field, structure: 'list-item', parent: node})
                    ]
                });
                break;
            case 'set':
                node.set({
                    children: [
                        Node.fromType((type as MetaSet).valueType, {field: {name: 'value', option: 'required'} as Field, structure: 'list-item', parent: node})
                    ]
                });
                break;
            case 'map':
                const buildMapItem = (v = []) => {
                    return [
                        Node.fromType((type as MetaMap).keyType, {
                            field: {name: 'key', option: 'required'} as Field,
                            structure: 'map-key',
                            value: v[0],
                            parent: node
                        }),
                        Node.fromType((type as MetaMap).valueType, {
                            field: {name: 'value', option: 'required'} as Field,
                            structure: 'map-value',
                            value: v[1],
                            parent: node
                        })
                    ];
                };
                const children: Node[] = [];
                if (value) {
                    for (const item of Array.from(value) as any[][]) {
                        children.push(...buildMapItem(item));
                    }
                }
                node.set({
                    children: value ? children : buildMapItem()
                });
                break;
            case 'bool':
                node.set({
                    control: new FormControl(value),
                    list: 'toggle'
                });
                break;
            default:
                node.set({
                    control: new FormControl(value),
                    list: 'field'
                });
                break;
        }
        return node;
    }

    findNode(refNode: Node): Node {
        if (refNode.metadata.name === this.metadata.name && this.parent && this.parent.children && this.parent.children.length >= 2) {
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

    set(obj: Partial<Node>) {
        for (const name of Object.keys(obj)) {
            this[name] = obj[name];
        }
    }

    extractData() {
        let result: any;
        switch (this.metadata.structure) {
            case 'const':
                // TODO
                break;
            case 'enum':
                break;
            case 'struct':
                result = this.children.reduce((struct, child) => {
                    struct[child.field.name] = child.extractData();
                    return struct;
                }, {});
                break;
            case 'union':
                result = this.select.options.reduce((union, option) => {
                    union[option.name] = option.value === this.select.selected && this.children && this.children[0]
                        ? this.children[0].extractData()
                        : undefined;
                    return union;
                }, {});
                break;
            case 'exception':
                // not used
                break;
            case 'list':
                break;
            case 'set':
                break;
            case 'map':
                result = new Map();
                for (let i = 0; i < this.children.length; i += 2) {
                    result.set(this.children[i].extractData(), this.children[i + 1].extractData());
                }
                break;
            case 'bool':
                break;
            default:
                result = this.control.value;
                break;
        }
        return result;
    }
}
