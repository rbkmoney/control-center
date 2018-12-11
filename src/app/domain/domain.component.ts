import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';

import { DomainService } from './domain.service';
import { Node } from './tree/model';
import { Snapshot } from '../gen-damsel/domain_config';

@Component({
    templateUrl: 'domain.component.html',
    styleUrls: ['../shared/container.css', 'domain.component.css']
})
export class DomainComponent implements OnInit {
    snapshot$: BehaviorSubject<Snapshot>;
    node$: BehaviorSubject<Node>;
    isLoading$: BehaviorSubject<boolean>;
    tabsModels: Array<{ node?: Node, isJSON?: boolean }> = [];
    selectedModel: number;
    model: Node;
    preview = false;
    reload: () => void;
    delete: () => void;
    save: () => void;

    constructor(private domainService: DomainService, private snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
        this.isLoading$ = this.domainService.isLoading$;
        this.node$ = this.domainService.node$;
        this.snapshot$ = this.domainService.snapshot$;
        this.reload = domainService.updateSnapshot;
        this.delete = () => domainService.delete(this.model.initValue);
        this.save = () => domainService.update(this.model.initValue, this.model.extractData());
    }

    ngOnInit() {
        combineLatest(this.route.paramMap, this.domainService.node$).subscribe(([params]) => {
            const node = this.domainService.getNode(params.get('ref'));
            this.model = node ? node.children[1] : null;
        });
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

    toggleView() {
        this.preview = !this.preview;
    }
}
