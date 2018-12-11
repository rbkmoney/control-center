import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { DomainService } from './domain.service';
import { Node } from './tree/model';
import { Snapshot } from '../gen-damsel/domain_config';

@Component({
    templateUrl: 'domain.component.html',
    styleUrls: ['../shared/container.css', 'domain.component.css']
})
export class DomainComponent {
    snapshot$: BehaviorSubject<Snapshot>;
    node$: BehaviorSubject<Node>;
    isLoading$: BehaviorSubject<boolean>;
    tabsModels: Array<{ node?: Node, isJSON?: boolean }> = [];
    selectedModel: number;

    constructor(private domainService: DomainService, private snackBar: MatSnackBar, private router: Router) {
        this.isLoading$ = this.domainService.isLoading$;
        this.node$ = this.domainService.node$;
        this.snapshot$ = this.domainService.snapshot$;
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
}
