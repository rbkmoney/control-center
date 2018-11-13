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
        const result: Node = {
            label: (f ? f.name + (f.option === 'required' ? '*' : '') + ' (' + obj.name + ')' : obj.name) + ` [${obj.structure}]`,
            structure: structure,
            isExpanded: false
        };
        switch (obj.structure) {
            case 'typedef':
                return this.buildViewModel((obj as TypeDef).type, {f, val});
            case 'const':
                return {
                    ...result
                };
            case 'enum':
                return {
                    ...result,
                    control: this.fb.control(''),
                    type: 'select',
                    select: {
                        options: (obj as Enum).items.map((item) => item.name),
                        selectionChange: () => {
                        }
                    }
                };
            case 'struct':
                return {
                    ...result,
                    children: (obj as Struct).fields.map((field) => this.buildViewModel(field.type, {f: field, val: val ? val[field.name] : undefined}))
                };
            case 'union':
                const res: Node = {
                    ...result,
                    type: 'select',
                    select: {
                        options: (obj as Union).fields.map(({name}) => name),
                        selectionChange: undefined,
                    }
                };
                const selectUnionChildren = (fieldName: string) => {
                    res.select.selected = fieldName;
                    const field: Field2 = (obj as Union).fields.find(({name}) => name === fieldName);
                    if (field) {
                        const r = this.buildViewModel(field.type, {f: field, val: val[fieldName]});
                        res.children = r.children;
                    } else {
                        res.children = [];
                    }
                };
                selectUnionChildren(val ? Object.keys(val).find((v) => !!val[v]) : undefined);
                res.select.selectionChange = ({value}) => selectUnionChildren(value);
                return res;
            case 'exception':
                return {
                    ...result
                };
            case 'list':
                return {
                    ...result,
                    children: [
                        this.buildViewModel((obj as List).valueType, {f: {name: 'value', option: 'required'} as Field2, structure: 'list-item'})
                    ]
                };
            case 'set':
                return {
                    ...result,
                    children: [
                        this.buildViewModel((obj as Set).valueType, {f: {name: 'value', option: 'required'} as Field2, structure: 'list-item'})
                    ]
                };
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
                return {
                    ...result,
                    children: val ? children : buildMapItem()
                };
            case 'bool':
                return {
                    ...result,
                    control: this.fb.control(val),
                    type: 'toggle'
                };
            default:
                return {
                    ...result,
                    control: this.fb.control(val),
                    type: 'field'
                };
        }
    }
}
