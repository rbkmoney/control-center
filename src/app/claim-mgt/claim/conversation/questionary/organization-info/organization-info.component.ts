import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { getUnionValue } from '../../../../../shared/utils';
import { Contractor } from '../../../../../thrift-services/ank/gen-model/questionary';

@Component({
    selector: 'cc-organization-info',
    templateUrl: 'organization-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationInfoComponent {
    @Input() contractor: Contractor;

    get entity() {
        return getUnionValue(getUnionValue(this.contractor)) as any;
    }

    get isInternationalLegalEntity() {
        return !!this.contractor?.legal_entity?.international_legal_entity;
    }
}
