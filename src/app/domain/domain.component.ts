import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { DomainService } from './domain.service';
import { Type } from '../metadata/metadata.service';
import { Domain } from '../gen-damsel/domain';
import { Node } from './tree/node';

@Component({
    templateUrl: 'domain.component.html',
    styleUrls: ['../shared/container.css', 'domain.component.css']
})
export class DomainComponent {
    metadata$: Observable<Type>;
    data$: Observable<Domain>;
    tabsModels: Node[] = [];
    selectedModel: number;

    constructor(private domainService: DomainService) {
        this.metadata$ = this.domainService.metadata$;
        this.data$ = this.domainService.snapshot$.pipe(switchMap((snapshot) => of(snapshot ? snapshot.domain : undefined)));
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
