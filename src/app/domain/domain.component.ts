import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { DomainService } from './domain.service';
import { Type } from '../metadata/metadata.service';
import { Domain } from '../gen-damsel/domain';
import { Node } from './tree/node';
import { stringify } from '../shared/stringify';

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
        // realtime test Node class
        if (data && this.node) {
            const aa = Array.from(data);
            const bb = Array.from(this.node.extractData());
            for (let i = 0; i < data.size; ++i) {
                console.log(i);
                const a = stringify(aa[i], 2).split('\n');
                console.log(aa[i]);
                const b = stringify(bb[i], 2).split('\n');
                console.log(bb[i]);
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

    closeTab(model: Node) {
        this.tabsModels.splice(this.tabsModels.findIndex((tabModel) => model === tabModel), 1);
    }
}
