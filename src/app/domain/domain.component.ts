import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { DomainService } from './domain.service';
import { Type } from '../metadata/metadata.service';
import { Node } from './tree/model';
import { stringify } from '../shared/stringify';
import { Snapshot } from '../gen-damsel/domain_config';
import { Exception } from '../thrift/exception';

@Component({
    templateUrl: 'domain.component.html',
    styleUrls: ['../shared/container.css', 'domain.component.css']
})
export class DomainComponent {
    metadata: Type;
    version: number;
    snapshot: Snapshot;
    node: Node;
    tabsModels: Array<{ node?: Node, isJSON?: boolean }> = [];
    selectedModel: number;
    isLoading = false;
    isDomainLoading = false;
    groups: any[] = [];
    commitErrorHandler = (error: Exception) => {
        console.error(error);
        this.snackBar.open(error.message || error.name, 'OK');
    };

    constructor(private domainService: DomainService, private snackBar: MatSnackBar, private router: Router) {
        this.domainService.metadata$.subscribe((metadata) => this.updateNode(metadata, this.snapshot, this.node));
        this.domainService.snapshot$.subscribe((snapshot) => this.updateNode(this.metadata, snapshot, this.node));
        this.domainService.node$.subscribe((node) => this.updateNode(this.metadata, this.snapshot, node));
        this.domainService.isLoading$.subscribe((isLoading) => this.isDomainLoading = isLoading);
    }

    updateNode(metadata: Type, snapshot: Snapshot, node: Node) {
        this.metadata = metadata;
        this.snapshot = snapshot;
        this.node = node;
        if (node) {
            const FAKE_COLUMN = '__node';
            this.groups = (this.metadata as any).type.valueType.fields.map((field) => {
                const {name} = field;
                const nodes = this.node.children.filter((child) => child.children[1].control.value === name);
                const elements = nodes.map((n) => {
                    const res = {} as any;
                    for (const child of n.children[1].children[0].children) {
                        for (const c of child.children) {
                            res[child.field.name + '.' + c.field.name] = c;
                        }
                    }
                    res[FAKE_COLUMN] = n;
                    return res;
                });
                const displayedColumns = elements[0] ? Object.keys(elements[0] || {}) : [];
                displayedColumns.splice(displayedColumns.findIndex((c) => c === FAKE_COLUMN), 1);
                return {
                    elements,
                    displayedColumns,
                    allColumns: [...displayedColumns, 'actions'],
                    name,
                    description: `${nodes.length}`
                };
            });
            // this.testAll();
        }
    }

    testAll() {
        if (this.snapshot.domain && this.node) {
            for (let i = 0; i < this.snapshot.domain.size; ++i) {
                console.log(i);
                const aa = Array.from(this.snapshot.domain);
                const bb = Array.from(this.node.extractData());
                this.test(aa[i], bb[i]);
            }
        }
    }

    // realtime test Node class
    test(aaa: any, bbb: any) {
        const a = stringify(aaa, 2).split('\n');
        console.log(aaa);
        const b = stringify(bbb, 2).split('\n');
        console.log(bbb);
        // console.log(extracted);
        for (let j = 0, res = ''; j < a.length; ++j) {
            res += '\n' + j + '. ' + a[j];
            if (a[j] !== b[j]) {
                console.log(res);
                console.error(j + '. ' + b[j]);
                break;
            }
            if (j === a.length - 1) {
                console.log('ok');
            }
        }
    }

    openTab(node: Node, isJSON = false) {
        const idx = this.tabsModels.findIndex((tabModel) => node === tabModel.node);
        if (idx >= 0) {
            this.selectedModel = idx;
            this.tabsModels[idx].isJSON = isJSON;
        } else {
            this.tabsModels.push({node, isJSON});
            this.selectedModel = this.tabsModels.length - 1;
        }
    }

    closeTab(model) {
        this.tabsModels.splice(this.tabsModels.findIndex((tabModel) => model === tabModel), 1);
    }

    routeToObject(node: Node) {
        this.router.navigateByUrl(`/domain/object/${this.domainService.getKey(node)}`);
    }
}
