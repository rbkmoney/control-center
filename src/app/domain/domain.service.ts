import { Injectable } from '@angular/core';

import { DomainService as ThriftDomainService } from '../thrift/domain.service';
import { MetadataService } from '../metadata/metadata.service';

@Injectable()
export class DomainService {
    constructor(private domainService: ThriftDomainService, private metadataService: MetadataService) {
    }

    checkout() {
        this.domainService.checkout({head: {}}).subscribe((snapshot) => {
            console.dir(snapshot);
            console.dir(this.metadataService.getMetadata('DomainObject'));
        });
    }
}
