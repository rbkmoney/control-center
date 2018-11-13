import { FormControl } from '@angular/forms';

import { Enum, Field, List, Map, Set, Struct, Type, TypeDef, Union } from '../../metadata/metadata.service';

export type Types = 'select' | 'toggle' | 'field';
export type Structure = 'list-item' | 'map-key' | 'map-value';

export class Node {
    metadata: Type;
    label: string;
    isExpanded: boolean;
    type?: Types;
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

    static fromType(obj: Type, {f, structure, val}: { f?: Field, structure?: Structure, val?: any } = {}) {
        if (!obj) {
            return undefined;
        }
        let node = new Node();
        node.label = (f ? f.name + (f.option === 'required' ? '*' : '') + ' (' + obj.name + ')' : obj.name) + ` [${obj.structure}]`;
        node.structure = structure;
        node.isExpanded = false;
        node.metadata = obj;
        switch (obj.structure) {
            case 'typedef':
                node = Node.fromType((obj as TypeDef).type, {f, val});
                break;
            case 'const':
                // TODO
                break;
            case 'enum':
                node.set({
                    control: new FormControl(''),
                    type: 'select',
                    select: {
                        options: (obj as Enum).items.map((item) => item.name),
                        selectionChange: () => {
                        }
                    }
                });
                break;
            case 'struct':
                node.set({
                    children: (obj as Struct).fields.map((field) => Node.fromType(field.type, {f: field, val: val ? val[field.name] : undefined}))
                });
                break;
            case 'union':
                node.set({
                    type: 'select',
                    select: {
                        options: (obj as Union).fields.map(({name}) => name),
                        selectionChange: undefined,
                    }
                });
                const selectUnionChildren = (fieldName: string) => {
                    node.select.selected = fieldName;
                    const field: Field = (obj as Union).fields.find(({name}) => name === fieldName);
                    if (field) {
                        const r = Node.fromType(field.type, {f: field, val: val[fieldName]});
                        node.children = r.children;
                    } else {
                        node.children = [];
                    }
                };
                selectUnionChildren(val ? Object.keys(val).find((v) => !!val[v]) : undefined);
                node.select.selectionChange = ({value}) => selectUnionChildren(value);
                break;
            case 'exception':
                // not used
                break;
            case 'list':
                node.set({
                    ...node,
                    children: [
                        Node.fromType((obj as List).valueType, {f: {name: 'value', option: 'required'} as Field, structure: 'list-item'})
                    ]
                });
                break;
            case 'set':
                node.set({
                    children: [
                        Node.fromType((obj as Set).valueType, {f: {name: 'value', option: 'required'} as Field, structure: 'list-item'})
                    ]
                });
                break;
            case 'map':
                const buildMapItem = (v = []) => {
                    return [
                        Node.fromType((obj as Map).keyType, {f: {name: 'key', option: 'required'} as Field, structure: 'map-key', val: v[0]}),
                        Node.fromType((obj as Map).valueType, {f: {name: 'value', option: 'required'} as Field, structure: 'map-value', val: v[1]})
                    ];
                };
                const children: Node[] = [];
                if (val) {
                    for (const item of Array.from(val) as any[][]) {
                        children.push(...buildMapItem(item));
                    }
                }
                node.set({
                    children: val ? children : buildMapItem()
                });
                break;
            case 'bool':
                node.set({
                    control: new FormControl(val),
                    type: 'toggle'
                });
                break;
            default:
                node.set({
                    control: new FormControl(val),
                    type: 'field'
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
