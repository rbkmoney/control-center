import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { DomainService } from './domain.service';
import { Type } from '../metadata/metadata.service';
import { createNode, Node } from './tree/node';
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
    tabsModels: Node[] = [];
    selectedModel: number;
    isLoading = false;
    isDomainLoading = false;
    groups: any[] = [];

    constructor(private domainService: DomainService, private snackBar: MatSnackBar) {
        this.domainService.metadata$.subscribe((metadata) => this.updateNode(metadata, this.snapshot));
        this.domainService.snapshot$.subscribe((snapshot) => this.updateNode(this.metadata, snapshot));
        this.domainService.isLoading$.subscribe((isLoading) => this.isDomainLoading = isLoading);
    }

    updateNode(metadata: Type, snapshot: Snapshot) {
        this.metadata = metadata;
        this.snapshot = snapshot;
        if (snapshot) {
            this.node = createNode(metadata, {value: this.snapshot.domain});
            const groupsNames = this.node.children.reduce((g, child) => {
                if (!g.find((name) => name === child.children[1].select.selected)) {
                    g.push(child.children[1].select.selected);
                }
                return g;
            }, []);
            console.log(groupsNames);
            this.groups = groupsNames.map((group) => {
                const nodes = this.node.children.filter((child) => child.children[1].select.selected === group);
                const displayedColumns = nodes[0].children[1].children[0].children.reduce((cols, child) => {
                    return cols.concat(child.children.map((c) => c.field.name));
                }, []);
                const elements = nodes.map((node) => {
                    const res = {} as any;
                    for (const child of node.children[1].children[0].children) {
                        for (const c of child.children) {
                            res[c.field.name] = c;
                        }
                    }
                    res.node = node;
                    return res;
                });
                return {
                    elements,
                    displayedColumns,
                    displayedNodes: []
                };
            });
            console.log(this.groups);
            this.testAll();
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

    toggleNode(element) {
        element.__displayed = !element.__displayed;
    }

    foundNode(node: Node) {
        const idx = this.tabsModels.findIndex((tabModel) => node === tabModel);
        if (idx >= 0) {
            this.selectedModel = idx;
        } else {
            this.tabsModels.push(node);
            this.selectedModel = this.tabsModels.length - 1;
        }
    }

    delete(node: Node) {
        this.isLoading = true;
        this.domainService.delete(node.children[1].initData).subscribe((result) => {
            this.isLoading = false;
            this.snackBar.open('DomainObject removed', 'OK');
            this.domainService.updateSnapshot();
        }, this.commitErrorHandler);
    }

    update(node: Node) {
        this.isLoading = true;
        this.domainService.update(node.children[1].initData, node.children[1].extractData()).subscribe((result) => {
            this.isLoading = false;
            this.snackBar.open('DomainObject updated', 'OK');
            this.domainService.updateSnapshot();
        }, this.commitErrorHandler);
    }

    insert(node: Node) {
        this.isLoading = true;
        this.domainService.insert(node.children[1].extractData()).subscribe((result) => {
            this.isLoading = false;
            this.snackBar.open('DomainObject inserted', 'OK');
            this.domainService.updateSnapshot();
        }, this.commitErrorHandler);
    }

    commitErrorHandler = (error: Exception) => {
        this.isLoading = false;
        console.error(error);
        this.snackBar.open(error.message || error.name, 'OK');
    }

    closeTab(model: Node) {
        this.tabsModels.splice(this.tabsModels.findIndex((tabModel) => model === tabModel), 1);
    }
}
