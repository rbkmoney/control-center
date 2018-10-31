import { Injectable } from '@angular/core';
import { DomainService as ThriftDomainService } from '../thrift/domain.service';

@Injectable()
export class DomainService {
    constructor(private domainService: ThriftDomainService) {
    }

    checkout() {
        this.domainService.checkout({head: {}}).subscribe((snapshot) => {
            console.dir(snapshot);
        });
    }
}
