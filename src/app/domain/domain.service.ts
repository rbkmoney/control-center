import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { DomainService as ThriftDomainService } from '../thrift/domain.service';
import { MetadataService, Type } from '../metadata/metadata.service';
import { Operation, Snapshot } from '../gen-damsel/domain_config';
import { DomainObject } from '../gen-damsel/domain';
import * as DomainConfigTypes from '../thrift/gen-nodejs/domain_config_types';
import { createNode, Node } from './tree/model';
import { stringify } from '../shared/stringify';
import { Exception } from '../thrift/exception';

@Injectable()
export class DomainService {
    form: FormGroup;
    snapshot: Snapshot;
    metadata: Type;
    snapshot$ = new BehaviorSubject<Snapshot>(null);
    metadata$ = new BehaviorSubject<Type>(null);
    node$ = new BehaviorSubject<Node>(null);
    isLoading$ = new BehaviorSubject<boolean>(false);
    tabs: {
        models: Array<{ node?: Node, isJSON?: boolean }>;
        selected?: number;
    } = {models: []};

    commitErrorHandler = (error: Exception) => {
        console.error(error);
        this.snackBar.open(error.message || error.name, 'OK');
    };

    updateSnapshot = () => {
        this.isLoading$.next(true);
        this.snapshot$.next(null);
        this.node$.next(null);
        return this.domainService.checkout({head: {}}).subscribe((snapshot) => {
            this.snapshot = snapshot;
            this.snapshot$.next(snapshot);
            this.node$.next(createNode({metadata: this.metadata, initValue: this.snapshot.domain}));
            console.dir(snapshot.domain);
            console.dir(this.metadataService.files);
        }, (error) => {
            this.commitErrorHandler(error);
        }, () => {
            this.isLoading$.next(false);
        });
    };

    constructor(private domainService: ThriftDomainService, private metadataService: MetadataService, private snackBar: MatSnackBar) {
        this.updateSnapshot();
        this.initMetadata();
    }

    initMetadata() {
        this.metadata = this.metadataService.get('Domain', 'domain');
        this.metadata$.next(this.metadata);
        console.dir(this.metadataService.metadata);
        console.dir(this.metadata);
    }

    commit(operations: Partial<Operation>) {
        this.isLoading$.next(true);
        const operation = new DomainConfigTypes.Operation();
        for (const name in operations) {
            if (operations.hasOwnProperty(name)) {
                operation[name] = operations[name];
            }
        }
        const commit = new DomainConfigTypes.Commit();
        commit.ops = [operation];
        console.log(commit);
        return this.domainService.commit(this.snapshot.version, commit).subscribe((version) => {
            this.updateSnapshot();
        }, () => {
        }, () => {
            this.isLoading$.next(false);
        });
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

    getKey(node: Node) {
        return stringify(node.children[0].children[0].initValue);
    }

    getNode(key: string): Node {
        return this.node$.getValue() ? this.node$.getValue().children.find((child) => {
            return key === this.getKey(child);
        }) : null;
    }

    openTab(node: Node, isJSON = false) {
        const idx = this.tabs.models.findIndex((tabModel) => node === tabModel.node);
        if (idx >= 0) {
            this.tabs.selected = idx;
            this.tabs.models[idx].isJSON = isJSON;
        } else {
            this.tabs.models.push({node, isJSON});
            this.tabs.selected = this.tabs.models.length - 1;
        }
    }

    closeTab(model) {
        this.tabs.models.splice(this.tabs.models.findIndex((tabModel) => model === tabModel), 1);
    }
}
