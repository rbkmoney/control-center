import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { DomainService as ThriftDomainService } from '../thrift/domain.service';
import { MetadataService, Type2 } from '../metadata/metadata.service';
import { Snapshot } from '../gen-damsel/domain_config';

@Injectable()
export class DomainService {
    form: FormGroup;
    snapshot$ = new BehaviorSubject<Snapshot>(null);
    metadata$ = new BehaviorSubject<Type2>(null);

    constructor(private domainService: ThriftDomainService, private metadataService: MetadataService, private fb: FormBuilder) {
        this.checkout();
    }

    checkout() {
        return this.domainService.checkout({head: {}}).subscribe((snapshot) => {
            this.snapshot$.next(snapshot);
            console.dir(snapshot.domain);
            console.dir(this.metadataService.files);
            console.dir(this.metadataService.metadata);
            const metadata = this.metadataService.get('Domain', 'domain');
            console.dir(metadata);
            this.metadata$.next(metadata);
        });
    }
}
