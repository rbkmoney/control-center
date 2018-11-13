import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Enum, Field2, List, Map, MetadataService, Set, Struct, Type2, TypeDef, Union } from '../../metadata/metadata.service';
import { Node, Structure } from './node';

@Injectable()
export class TreeService {
    constructor(private metadataService: MetadataService, private fb: FormBuilder) {
    }

    buildViewModel(obj: Type2, {f, structure, val}: { f?: Field2, structure?: Structure, val?: any } = {}): Node {
        if (!obj) {
            return undefined;
        }
        let node = new Node();
        node.label = (f ? f.name + (f.option === 'required' ? '*' : '') + ' (' + obj.name + ')' : obj.name) + ` [${obj.structure}]`;
        node.structure = structure;
        node.isExpanded = false;
        node.obj = obj;
        switch (obj.structure) {
            case 'typedef':
                node = this.buildViewModel((obj as TypeDef).type, {f, val});
                break;
            case 'const':
                // TODO
                break;
            case 'enum':
                node.set({
                    control: this.fb.control(''),
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
                    children: (obj as Struct).fields.map((field) => this.buildViewModel(field.type, {f: field, val: val ? val[field.name] : undefined}))
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
                    const field: Field2 = (obj as Union).fields.find(({name}) => name === fieldName);
                    if (field) {
                        const r = this.buildViewModel(field.type, {f: field, val: val[fieldName]});
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
                        this.buildViewModel((obj as List).valueType, {f: {name: 'value', option: 'required'} as Field2, structure: 'list-item'})
                    ]
                });
                break;
            case 'set':
                node.set({
                    children: [
                        this.buildViewModel((obj as Set).valueType, {f: {name: 'value', option: 'required'} as Field2, structure: 'list-item'})
                    ]
                });
                break;
            case 'map':
                const buildMapItem = (v = []) => {
                    return [
                        this.buildViewModel((obj as Map).keyType, {f: {name: 'key', option: 'required'} as Field2, structure: 'map-key', val: v[0]}),
                        this.buildViewModel((obj as Map).valueType, {f: {name: 'value', option: 'required'} as Field2, structure: 'map-value', val: v[1]})
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
                    control: this.fb.control(val),
                    type: 'toggle'
                });
                break;
            default:
                node.set({
                    control: this.fb.control(val),
                    type: 'field'
                });
                break;
        }
        return node;
    }
}
