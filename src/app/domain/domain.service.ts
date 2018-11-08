import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { DomainService as ThriftDomainService } from '../thrift/domain.service';
import { MetadataService } from '../metadata/metadata.service';

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
            this.nodes = [domainNode];
            this.dataChange.next(this.nodes);
        });
    }

    buildViewModel(obj: any /*Type2*/): Node {
        switch (obj.structure) {
            case 'typedef':
                return {
                    label: obj.name
                };
            case 'const':
                return {
                    label: obj.name
                };
            case 'enum':
                return {
                    label: obj.name
                };
            case 'struct':
                return {
                    label: obj.name,
                    children: obj.fields.map((field) => this.buildViewModel(field.type))
                };
            case 'union':
                const res = {
                    label: obj.name,
                    values: obj.fields.map(({name}) => name)
                };
                res.selectionChange = ({value}) => {
                    res.selected = value;
                    const r = this.buildViewModel(obj.fields.find(({name}) => name === value).type);
                    res.children = r.children;
                    this.dataChange.next(this.nodes);
                };
                return res;
            case 'exception':
                return {
                    label: obj.name
                };
            default:
                return {
                    label: obj.name
                };
        }
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
