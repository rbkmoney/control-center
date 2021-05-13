import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import get from 'lodash-es/get';

import { getUnionKey } from '@cc/utils/get-union-key';

import {
    RussianIndividualEntity,
    RussianLegalEntity,
    WithoutChiefAccountant,
} from '../../../../../../thrift-services/ank/gen-model/questionary';

const WITHOUT_CHIEF_ACCOUNTANT_TITLES: { [name in keyof WithoutChiefAccountant]: string } = {
    accounting_organization: 'Организация ведущая бухгалтерский учет',
    head_accounting: 'Руководитель организации',
    individual_accountant: 'Бухгалтер - индивидуальный специалист',
};

@Component({
    selector: 'cc-russian-entity',
    templateUrl: 'russian-entity.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RussianEntityComponent {
    @Input() entity: RussianLegalEntity | RussianIndividualEntity;

    get registrationAddress() {
        if (this.entity?.registration_info?.individual_registration_info) {
            return this.entity.registration_info.individual_registration_info.registration_place;
        } else if (this.entity?.registration_info?.legal_registration_info) {
            return this.entity.registration_info.legal_registration_info.registration_address;
        }
        return '';
    }

    get accountantType() {
        return WITHOUT_CHIEF_ACCOUNTANT_TITLES[
            getUnionKey(
                get(this.entity, ['additional_info', 'accountant_info', 'without_chief_accountant'])
            )
        ];
    }
}
