import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { DomainService as ThriftDomainService } from '../thrift/domain.service';
import { Enum, Field2, List, Map, MetadataService, Set, Struct, Type2, TypeDef, Union } from '../metadata/metadata.service';

type Types = 'list-item' | 'map-key' | 'map-value' | 'select' | 'bool';

export interface Node {
    label: string;
    type?: Types;
    control?: FormControl;
    children?: Node[];
    select?:  {
        options: string[];
        selected?: string;
        selectionChange({value}): any;
    };
}

@Injectable()
export class DomainService {
    dataChange = new BehaviorSubject<any>([]);
    form: FormGroup;
    nodes: any;

    constructor(private domainService: ThriftDomainService, private metadataService: MetadataService, private fb: FormBuilder) {
    }

    get data() {
        return this.dataChange.value;
    }

    checkout() {
        this.domainService.checkout({head: {}}).subscribe((snapshot) => {
            console.dir(snapshot.domain);
            console.dir(this.metadataService.files);
            console.dir(this.metadataService.metadata);
            const domainObject: any = this.metadataService.get('Domain', 'domain');
            console.dir(domainObject);
            const domainNode = this.buildViewModel(domainObject);
            console.dir(domainNode);
            this.updateData([domainNode]);
        });
    }

    buildViewModel(obj: Type2, f?: Field2, structure?: Types): Node {
        const result: Node = {
            label: f ? f.name + (f.option === 'required' ? '*' : '') + ' (' + obj.name + ')' : obj.name,
            type: structure
        };
        switch (obj.structure) {
            case 'typedef':
                return this.buildViewModel((obj as TypeDef).type, f);
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
                    children: (obj as Struct).fields.map((field) => this.buildViewModel(field.type, field))
                };
            case 'union':
                const res: Node = {
                    ...result,
                    children: [],
                    type: 'select',
                    select: {
                        options: (obj as Union).fields.map(({name}) => name),
                        selectionChange: undefined
                    }
                };
                res.select.selectionChange = ({value}) => {
                    res.select.selected = value;
                    const field: Field2 = (obj as Union).fields.find(({name}) => name === value);
                    if (field) {
                        const r = this.buildViewModel(field.type, field);
                        res.children = r.children;
                    } else {
                        res.children = [];
                    }
                    this.updateData();
                };
                return res;
            case 'exception':
                return {
                    ...result
                };
            case 'list':
                return {
                    ...result,
                    children: [
                        this.buildViewModel((obj as List).valueType, {name: 'value', option: 'required'} as Field2, 'list-item')
                    ]
                };
            case 'set':
                return {
                    ...result,
                    children: [
                        this.buildViewModel((obj as Set).valueType, {name: 'value', option: 'required'} as Field2, 'list-item')
                    ]
                };
            case 'map':
                return {
                    ...result,
                    children: [
                        this.buildViewModel((obj as Map).keyType, {name: 'key', option: 'required'} as Field2, 'map-key'),
                        this.buildViewModel((obj as Map).valueType, {name: 'value', option: 'required'} as Field2, 'map-value')
                    ]
                };
            case 'bool':
                return {
                    ...result,
                    control: this.fb.control(''),
                    type: 'bool'
                };
            default:
                return {
                    ...result,
                    control: this.fb.control('')
                };
        }
    }

    updateData(nextData = this.nodes) {
        this.nodes = nextData;
        this.dataChange.next(nextData);
    }

    buildForm(obj: any) {
        if (obj.type === 'union') {
            return this.fb.group(obj.fields.reduce((acc, x) => {
                return {
                    ...acc,
                    [x.name]: this.fb.control('')
                };
            }, {}));
        }
        return this.fb.control('');
    }
}
