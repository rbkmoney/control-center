import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { DomainService as ThriftDomainService } from '../thrift/domain.service';
import { Field2, MetadataService, Type2 } from '../metadata/metadata.service';

interface Node {
    label: string;
    control?: FormControl;
    children?: Node;
    isExpanded?: boolean;
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
            const domainObject: any = this.metadataService.get('DomainObject', 'domain');
            console.dir(domainObject);
            const domainNode = this.buildViewModel(domainObject);
            console.dir(domainNode);
            this.updateData([domainNode]);
        });
    }

    buildViewModel(obj: Type2, f?: Field2): Node {
        const result = {
            label: f ? f.name + (f.option === 'required' ? '*' : '') + ' (' + obj.name + ')' : obj.name
        };
        switch (obj.structure) {
            case 'typedef':
                return this.buildViewModel(obj.type, f);
            case 'const':
                return {
                    ...result
                };
            case 'enum':
                return {
                    ...result
                };
            case 'struct':
                return {
                    ...result,
                    children: obj.fields.map((field) => this.buildViewModel(field.type, field))
                };
            case 'union':
                const res = {
                    ...result,
                    values: obj.fields.map(({name}) => name)
                };
                res.selectionChange = ({value}) => {
                    res.selected = value;
                    const field = obj.fields.find(({name}) => name === value);
                    const r = this.buildViewModel(field.type, field);
                    res.children = r.children;
                    this.updateData();
                };
                return res;
            case 'exception':
                return {
                    ...result
                };
            default:
                return {
                    ...result
                };
        }
    }

    updateData(nextData = this.nodes) {
        this.nodes = nextData;
        this.dataChange.next(nextData);
    }

    buildForm(obj: any) {
        if (obj.structure === 'union') {
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
