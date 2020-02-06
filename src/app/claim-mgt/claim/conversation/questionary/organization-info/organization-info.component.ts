import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {
    WithoutChiefAccountant,
    Contractor
} from '../../../../../thrift-services/ank/gen-model/questionary';
import { getUnionKey, getUnionValue } from '../../../../../shared/utils/get-union-key';
import get from 'lodash-es/get';

const WithoutChiefAccountantTitles: { [name in keyof WithoutChiefAccountant]: string } = {
    accounting_organization: 'Организация ведущая бухгалтерский учет',
    head_accounting: 'Руководитель организации',
    individual_accountant: 'Бухгалтер - индивидуальный специалист'
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
