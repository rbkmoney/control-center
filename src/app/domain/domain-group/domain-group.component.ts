import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { DomainGroupService } from './domain-group.service';
import { DomainGroup } from './domain-group';
import { DomainService } from '../domain.service';

@Component({
    selector: 'cc-domain-group',
    templateUrl: './domain-group.component.html',
    providers: [DomainGroupService]
})
export class DomainGroupComponent {
    group$: Observable<DomainGroup[]>;
    version$: Observable<number>;

    constructor(private groupService: DomainGroupService, private domainService: DomainService) {
        this.group$ = this.groupService.group$;
        this.version$ = this.groupService.varsion$;
        this.domainService.payload$.subscribe(p => this.groupService.group(p));
    }
}
