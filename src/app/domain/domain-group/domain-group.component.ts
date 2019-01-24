import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { DomainGroupService } from './domain-group.service';
import { DomainGroup } from './domain-group';

@Component({
    selector: 'cc-domain-group',
    templateUrl: './domain-group.component.html',
    providers: [DomainGroupService]
})
export class DomainGroupComponent {
    group$: Observable<DomainGroup[]>;
    version$: Observable<number>;

    constructor(private groupService: DomainGroupService) {
        this.group$ = this.groupService.group$;
        this.version$ = this.groupService.version$;
    }
}
