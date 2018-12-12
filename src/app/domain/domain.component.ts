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
    model: Node;
    preview = false;
    reload: () => void;
    delete: () => void;
    save: () => void;
    tabs: {
        models: Array<{ node?: Node, isJSON?: boolean }>;
        selected?: number;
    };
    openTab: (node: Node, isJSON: boolean) => void;
    closeTab: (node: Node) => void;

    constructor(private domainService: DomainService, private snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
        this.isLoading$ = this.domainService.isLoading$;
        this.node$ = this.domainService.node$;
        this.snapshot$ = this.domainService.snapshot$;
        this.reload = domainService.updateSnapshot;
        this.delete = () => domainService.delete(this.model.initValue);
        this.save = () => domainService.update(this.model.initValue, this.model.extractData());
        this.tabs = domainService.tabs;
        this.openTab = domainService.openTab;
        this.closeTab = domainService.closeTab;
    }

    ngOnInit() {
        combineLatest(this.route.paramMap, this.domainService.node$).subscribe(([params]) => {
            const node = this.domainService.getNode(params.get('group'), params.get('ref'));
            this.model = node ? node.children[1] : null;
        });
    }

    toggleView() {
        this.preview = !this.preview;
    }
}
