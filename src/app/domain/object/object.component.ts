import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';

import { DomainService } from '../domain.service';
import { Node } from '../tree/model';

@Component({
    templateUrl: 'object.component.html',
    styleUrls: ['../../shared/container.css', 'object.component.css']
})
export class ObjectComponent implements OnInit {
    node: Node;
    model: Node;
    preview = false;
    reload: () => void;
    delete: () => void;
    save: () => void;
    isLoading = false;

    constructor(private domainService: DomainService, private route: ActivatedRoute, private router: Router) {
        this.reload = domainService.updateSnapshot;
        this.delete = () => domainService.delete(this.model.initValue);
        this.save = () => domainService.update(this.model.initValue, this.model.extractData());
        this.domainService.isLoading$.subscribe((isLoading) => this.isLoading = isLoading);
    }

    ngOnInit() {
        combineLatest(this.route.paramMap, this.domainService.node$).subscribe(([params]) => {
            const node = this.domainService.getNode(params.get('ref'));
            if (node) {
                this.model = node.children[1];
                this.node = node ? this.model.children[0] : null;
            } else {
                this.model = this.node = null;
            }
        });
    }

    toggleView() {
        this.preview = !this.preview;
    }
}
