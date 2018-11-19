import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { DomainService as ThriftDomainService } from '../thrift/domain.service';
import { MetadataService, Type } from '../metadata/metadata.service';
import { Operation, Snapshot } from '../gen-damsel/domain_config';
import { DomainObject } from '../gen-damsel/domain';
import * as DomainConfigTypes from '../thrift/gen-nodejs/domain_config_types';

@Injectable()
export class DomainService {
    form: FormGroup;
    snapshot: Snapshot;
    snapshot$ = new BehaviorSubject<Snapshot>(null);
    metadata$ = new BehaviorSubject<Type>(null);

    constructor(private domainService: ThriftDomainService, private metadataService: MetadataService, private fb: FormBuilder) {
        this.updateSnapshot();
    }

    updateSnapshot() {
        return this.domainService.checkout({head: {}}).subscribe((snapshot) => {
            this.snapshot = snapshot;
            this.snapshot$.next(snapshot);
            console.dir(snapshot.domain);
            console.dir(this.metadataService.files);
            console.dir(this.metadataService.metadata);
            const metadata = this.metadataService.get('Domain', 'domain');
            console.dir(metadata);
            this.metadata$.next(metadata);
        });
    }

    commit(operation: Operation) {
        return this.domainService.commit(this.snapshot.version, new DomainConfigTypes.Commit({
            ops: [
                new DomainConfigTypes.Operation(operation)
            ]
        }));
    }

    delete(object: DomainObject) {
        return this.commit({
            insert: null,
            update: null,
            remove: {
                object
            }
        });
    }

    update(oldObject: DomainObject, newObject: DomainObject) {
        return this.commit({
            insert: null,
            update: {
                oldObject,
                newObject
            },
            remove: null
        });
    }

    insert(object: DomainObject) {
        return this.commit({
            insert: {
                object
            },
            update: null,
            remove: null
        });
    }
}
