import { Injectable } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { DomainService as ThriftDomainService } from '../thrift/domain.service';
import { MetadataService } from '../metadata/metadata.service';

class DomainBaseNode {
    label: string;
    type: string;
}

export class DomainLeafNode extends DomainBaseNode {
    control: FormControl;
}

export class DomainNode extends DomainBaseNode {
    children: Array<DomainNode | DomainLeafNode>;
}

@Injectable()
export class DomainService {
    dataChange = new BehaviorSubject<DomainNode[]>([]);

    constructor(private domainService: ThriftDomainService, private metadataService: MetadataService, private fb: FormBuilder) {
        this.initialize();
    }

    get data(): DomainNode[] {
        return this.dataChange.value;
    }

    checkout() {
        this.domainService.checkout({head: {}}).subscribe((snapshot) => {
            console.dir(snapshot.domain);
            console.dir(this.metadataService.files);
            const domainObject = this.metadataService.get('DomainObject', 'domain');
            console.dir(domainObject);
            console.dir(this.metadataService.get('ProviderObject', 'domain'));
        });
    }

    initialize() {
        const data: DomainNode[] = [
            {
                label: 'Documents',
                type: 'struct',
                children: [{
                    label: 'Documents',
                    type: 'struct',
                    children: [{
                        label: 'Hello',
                        type: 'struct',
                        control: this.fb.control('hello')
                    }, {
                        label: 'Documents',
                        type: 'struct',
                        children: [{
                            label: 'Hello',
                            type: 'struct',
                            control: this.fb.control('hello')
                        }]
                    }]
                }]
            }
        ];
        this.dataChange.next(data);
    }
}
