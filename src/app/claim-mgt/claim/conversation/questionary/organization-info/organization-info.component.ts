import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {
    RussianLegalEntity,
    RussianIndividualEntity,
    WithoutChiefAccountant
} from '../../../../../thrift-services/ank/gen-model/questionary';
import { getUnionKey } from '../../../../../shared/utils/get-union-key';

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
    @Input() contractor: RussianLegalEntity | RussianIndividualEntity;

    get nameWithInn() {
        return [this.contractor.name, this.contractor.inn && `(${this.contractor.inn})`]
            .filter(i => i)
            .join(' ');
    }

    get registrationAddress() {
        if (!this.contractor.registration_info) {
            return '';
        }
        if (this.contractor.registration_info.individual_registration_info) {
            return this.contractor.registration_info.individual_registration_info
                .registration_place;
        } else if (this.contractor.registration_info.legal_registration_info) {
            return this.contractor.registration_info.legal_registration_info.registration_address;
        }
        return '';
    }

    get staffCount() {
        return this.contractor.additional_info.staff_count;
    }

    get withChiefAccountant() {
        return !!this.contractor.additional_info.accountant_info.with_chief_accountant;
    }

    get accountantType() {
        return WithoutChiefAccountantTitles[
            getUnionKey(this.contractor.additional_info.accountant_info.without_chief_accountant)
        ];
    }

    get accountantInn() {
        return this.contractor.additional_info.accountant_info.without_chief_accountant
            ? this.contractor.additional_info.accountant_info.without_chief_accountant
                  .accounting_organization.inn
            : null;
    }

    get hasBeneficiary() {
        return this.contractor.additional_info.has_beneficiary;
    }

    get hasLiquidationProcess() {
        return this.contractor.additional_info.has_liquidation_process;
    }

    get monthOperationCount() {
        return this.contractor.additional_info.month_operation_count;
    }

    get monthOperationSum() {
        return this.contractor.additional_info.month_operation_sum;
    }
}
