import { Injectable } from '@angular/core';

import { DomainService as ThriftDomainService } from '../thrift/domain.service';
import { MetadataService } from '../metadata/metadata.service';
import { ThriftDomainObjectGroupService } from '../metadata/object/thrift-domain-object-group.service';

@Injectable()
export class DomainService {
    constructor(private domainService: ThriftDomainService, private metadataService: MetadataService) {
    }

    checkout() {
        this.domainService.checkout({head: {}}).subscribe((snapshot) => {
            console.dir(snapshot);
            const metadata = this.metadataService.getMetadata('DomainObject');
            console.dir(metadata);
            console.dir(ThriftDomainObjectGroupService.groupThriftDomain(snapshot.domain, metadata));
        });
    }
}
