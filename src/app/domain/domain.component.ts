import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { DomainService } from './domain.service';
import { Type } from '../metadata/metadata.service';
import { Domain } from '../gen-damsel/domain';
import { Node } from './tree/node';
import { stringify } from '../shared/stringify';
import { DomainObject } from '../thrift/gen-nodejs/domain_types';

@Component({
    templateUrl: 'domain.component.html',
    styleUrls: ['../shared/container.css', 'domain.component.css']
})
export class DomainComponent {
    metadata$: Observable<Type>;
    metadata: Type;
    data$: Observable<Domain>;
    data: any;
    node: Node;
    tabsModels: Node[] = [];
    selectedModel: number;

    constructor(private domainService: DomainService) {
        this.metadata$ = this.domainService.metadata$;
        this.data$ = this.domainService.snapshot$.pipe(switchMap((snapshot) => of(snapshot ? snapshot.domain : undefined)));
        this.metadata$.subscribe((metadata) => this.updateNode(metadata, this.data));
        this.data$.subscribe((data) => this.updateNode(this.metadata, data));
    }

    updateNode(metadata: Type, data: any) {
        this.metadata = metadata;
        this.data = data;
        this.node = Node.fromType(metadata, {value: data, parent: undefined});
        if (data && this.node) {
            for (let i = 0; i < data.size; ++i) {
                console.log(i);
                const aa = Array.from(data);
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

    foundNode(node: Node) {
        const idx = this.tabsModels.findIndex((tabModel) => node === tabModel);
        if (idx >= 0) {
            this.selectedModel = idx;
        } else {
            this.tabsModels.push(node);
            this.selectedModel = this.tabsModels.length - 1;
        }
    }

    save(node: Node) {
        console.log(this.test(node.children[1].initData, new DomainObject(node.children[1].extractData())));
    }

    closeTab(model: Node) {
        this.tabsModels.splice(this.tabsModels.findIndex((tabModel) => model === tabModel), 1);
    }
}
