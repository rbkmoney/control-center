import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {
    WithoutChiefAccountant,
    Contractor
} from '../../../../../thrift-services/ank/gen-model/questionary';
import { getUnionKey, getUnionValue } from '../../../../../shared/utils/get-union-key';
import get from 'lodash-es/get';

const WithoutChiefAccountantTitles: { [name in keyof WithoutChiefAccountant]: string } = {
    accounting_organization: 'Accounting organization',
    head_accounting: 'Head accounting',
    individual_accountant: 'Individual accountant'
};

@Component({
    selector: 'cc-organization-info',
    templateUrl: 'organization-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationInfoComponent {
    @Input() contractor: Contractor;

    get entity() {
        return getUnionValue(getUnionValue(this.contractor));
    }

    get registrationAddress() {
        if (this.entity.registration_info.individual_registration_info) {
            return this.entity.registration_info.individual_registration_info.registration_place;
        } else if (this.entity.registration_info.legal_registration_info) {
            return this.entity.registration_info.legal_registration_info.registration_address;
        }
        return '';
    }

    get accountantType() {
        return WithoutChiefAccountantTitles[
            getUnionKey(
                get(this.entity, ['additional_info', 'accountant_info', 'without_chief_accountant'])
            )
        ];
    }
}
