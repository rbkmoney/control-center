import { FormControl } from '@angular/forms';

import { Enum, Field, MetaList, MetaMap, MetaSet, Struct, Type, TypeDef, Union } from '../../metadata/metadata.service';

export type ListType = 'select' | 'toggle' | 'field';
export type Structure = 'list-item' | 'map-key' | 'map-value';

export class Node {
    metadata: Type;
    parent: Node;
    label: string;
    isExpanded: boolean;
    list?: ListType;
    structure?: Structure;
    control?: FormControl;
    children?: Node[];
    select?: {
        options: string[];
        selected?: string;
        selectionChange({value}): any;
    };

    constructor() {
    }

    static fromType(obj: Type, {field, structure, value, parent}: { field?: Field, structure?: Structure, value?: any, parent: Node }) {
        if (!obj) {
            return undefined;
        }
        let node = new Node();
        node.label = (field ? field.name + (field.option === 'required' ? '*' : '') + ' (' + obj.name + ')' : obj.name) + ` [${obj.structure}]`;
        node.structure = structure;
        node.isExpanded = false;
        node.metadata = obj;
        node.parent = parent;
        switch (obj.structure) {
            case 'typedef':
                node = Node.fromType((obj as TypeDef).type, {field, value, parent});
                break;
            case 'const':
                // TODO
                break;
            case 'enum':
                node.set({
                    control: new FormControl(''),
                    list: 'select',
                    select: {
                        options: (obj as Enum).items.map((item) => item.name),
                        selectionChange: () => {
                        }
                    }
                });
                break;
            case 'struct':
                node.set({
                    children: (obj as Struct).fields.map((childField) => Node.fromType(childField.type, {
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
                        options: (obj as Union).fields.map(({name}) => name),
                        selectionChange: undefined,
                    }
                });
                const selectUnionChildren = (fieldName: string) => {
                    node.select.selected = fieldName;
                    const childField: Field = (obj as Union).fields.find(({name}) => name === fieldName);
                    if (childField) {
                        const r = Node.fromType(childField.type, {field: childField, value: value[fieldName], parent: node});
                        node.children = r.children;
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
                        Node.fromType((obj as MetaList).valueType, {field: {name: 'value', option: 'required'} as Field, structure: 'list-item', parent: node})
                    ]
                });
                break;
            case 'set':
                node.set({
                    children: [
                        Node.fromType((obj as MetaSet).valueType, {field: {name: 'value', option: 'required'} as Field, structure: 'list-item', parent: node})
                    ]
                });
                break;
            case 'map':
                const buildMapItem = (v = []) => {
                    return [
                        Node.fromType((obj as MetaMap).keyType, {
                            field: {name: 'key', option: 'required'} as Field,
                            structure: 'map-key',
                            value: v[0],
                            parent: node
                        }),
                        Node.fromType((obj as MetaMap).valueType, {
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

    set(obj: Partial<Node>) {
        for (const name of Object.keys(obj)) {
            this[name] = obj[name];
        }
    }

    serialize() {
        let result;
        switch (this.metadata.structure) {
            case 'const':
                // TODO
                break;
            case 'enum':
                break;
            case 'struct':
                break;
            case 'union':
                break;
            case 'exception':
                // not used
                break;
            case 'list':
                break;
            case 'set':
                break;
            case 'map':
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
