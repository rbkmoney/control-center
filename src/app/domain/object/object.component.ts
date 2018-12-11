import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DomainService } from '../domain.service';
import { Node } from '../tree/model';

@Component({
    selector: 'cc-objects',
    templateUrl: 'object.component.html',
    styleUrls: ['../../shared/container.css', 'object.component.css']
})
export class ObjectComponent {
    @Input()
    model: Node;

    preview = false;
    reload: () => void;
    delete: () => void;
    save: () => void;
    isLoading$: BehaviorSubject<boolean>;

    constructor(private domainService: DomainService) {
        this.reload = domainService.updateSnapshot;
        this.delete = () => domainService.delete(this.model.initValue);
        this.save = () => domainService.update(this.model.initValue, this.model.extractData());
        this.isLoading$ = this.domainService.isLoading$;
    }

    get node() {
        if (this.model) {
            return this.model.children[0];
        }
        return null;
    }

    toggleView() {
        this.preview = !this.preview;
    }
}
