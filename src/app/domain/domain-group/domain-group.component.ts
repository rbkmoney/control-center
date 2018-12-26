import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { DomainObject } from '../../gen-damsel/domain';
import { AstDefenition } from '../metadata-loader';
import { DomainGroupService } from './domain-group.service';
import { DomainGroup } from './domain-group';

@Component({
    selector: 'cc-domain-group',
    templateUrl: './domain-group.component.html',
    styleUrls: ['./domain-group.component.scss'],
    providers: [DomainGroupService]
})
export class DomainGroupComponent implements OnChanges {
    @Input()
    domainObjects: DomainObject[];

    @Input()
    domainObjectDef: AstDefenition[];

    group: DomainGroup[];

    constructor(private groupService: DomainGroupService) {}

    ngOnChanges({ domainObjects, domainObjectDef }: SimpleChanges) {
        if (domainObjects && domainObjects.currentValue) {
            this.groupService.setDomainObjects(domainObjects.currentValue);
        }
        if (domainObjectDef && domainObjectDef.currentValue) {
            this.groupService.setDefenition(domainObjectDef.currentValue);
        }
        this.group = this.groupService.group();
    }
}
