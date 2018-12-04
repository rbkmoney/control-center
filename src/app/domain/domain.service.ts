import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { DomainService as ThriftDomainService } from '../thrift/domain.service';
import { MetadataService, Type } from '../metadata/metadata.service';
import { Operation, Snapshot } from '../gen-damsel/domain_config';
import { DomainObject } from '../gen-damsel/domain';
import * as DomainConfigTypes from '../thrift/gen-nodejs/domain_config_types';
import { createNode, Node } from './tree/node';
import { stringify } from '../shared/stringify';

@Injectable()
export class DomainService {
    form: FormGroup;
    snapshot: Snapshot;
    metadata: Type;
    snapshot$ = new BehaviorSubject<Snapshot>(null);
    metadata$ = new BehaviorSubject<Type>(null);
    node$ = new BehaviorSubject<Node>(null);
    isLoading$ = new BehaviorSubject<boolean>(false);

    constructor(private domainService: ThriftDomainService, private metadataService: MetadataService, private fb: FormBuilder) {
        this.updateSnapshot();
        this.initMetadata();
    }

    updateSnapshot() {
        this.isLoading$.next(true);
        this.snapshot$.next(null);
        this.node$.next(null);
        return this.domainService.checkout({head: {}}).subscribe((snapshot) => {
            this.snapshot = snapshot;
            this.snapshot$.next(snapshot);
            this.isLoading$.next(false);
            this.node$.next(createNode(this.metadata, {value: this.snapshot.domain}));
            console.dir(snapshot.domain);
            console.dir(this.metadataService.files);
        });
    }

    initMetadata() {
        this.metadata = this.metadataService.get('Domain', 'domain');
        this.metadata$.next(this.metadata);
        console.dir(this.metadataService.metadata);
        console.dir(this.metadata);
    }

    commit(operations: Partial<Operation>) {
        const operation = new DomainConfigTypes.Operation();
        for (const name in operations) {
            if (operations.hasOwnProperty(name)) {
                operation[name] = operations[name];
            }
        }
        const commit = new DomainConfigTypes.Commit();
        commit.ops = [operation];
        console.log(commit);
        return this.domainService.commit(this.snapshot.version, commit);
    }

    delete(object: DomainObject) {
        const op = new DomainConfigTypes.RemoveOp();
        op.object = object;
        return this.commit({remove: op});
    }

    update(oldObject: DomainObject, newObject: DomainObject) {
        const op = new DomainConfigTypes.UpdateOp();
        op.old_object = oldObject;
        op.new_object = newObject;
        return this.commit({update: op});
    }

    insert(object: DomainObject) {
        const op = new DomainConfigTypes.InsertOp();
        op.object = object;
        return this.commit({insert: op});
    }

    getNode(objectName: string, key: string): Node {
        return this.node$.getValue() ? this.node$.getValue().children.find((child) => {
            return child.children[1].select.selected === objectName && key === stringify(child.children[0].children[0].initData);
        }) : null;
    }
}
