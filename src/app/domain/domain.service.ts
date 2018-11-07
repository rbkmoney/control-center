import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { DomainService as ThriftDomainService } from '../thrift/domain.service';
import { MetadataService } from '../metadata/metadata.service';

@Injectable()
export class DomainService {
    dataChange = new BehaviorSubject<any>([]);
    form: FormGroup;

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
            this.dataChange.next(domainObject);
        });
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
