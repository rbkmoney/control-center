import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as uuid from 'uuid/v4';

import { QuestionaryData } from '../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../thrift-services/damsel/gen-model/claim_management';
import { createContractCreation, createPayoutToolCreation, createShopCreation } from './creators';
import { createContractor } from './creators/create-contractor';
import { createShopAccountCreation } from './creators/create-shop-account-creation';
import { ExtractFormValue } from './extract-form-value';

@Injectable()
export class PartyModificationsExtractorDialogService {
    form = this.fb.group({
        category: this.fb.group({}),
        payment_institution: this.fb.group({}),
        contractor: this.fb.group({}),
    });

    constructor(private fb: FormBuilder) {}

    mapToModifications(d: QuestionaryData): PartyModification[] {
        const {
            category,
            payment_institution,
            contractor: { id },
        }: ExtractFormValue = this.form.value;
        const contractorID = uuid();
        const shopID = uuid();
        const contractID = uuid();
        const payoutToolID = uuid();

        const result = [];

        if (d.contractor) {
            const contractorCreationModification = createContractor(d, contractorID);
            result.push(contractorCreationModification);
        }

        const contractCreationModification = createContractCreation(
            d.contractor ? contractorID : id,
            contractID,
            payment_institution
        );
        result.push(contractCreationModification);

        const payoutToolCreationModification = createPayoutToolCreation(
            d,
            contractID,
            payoutToolID
        );
        result.push(payoutToolCreationModification);

        const shopCreationModification = createShopCreation(
            d,
            contractID,
            payoutToolID,
            category.id,
            shopID
        );
        const shopAccountCreation = createShopAccountCreation(shopID);
        result.push(shopCreationModification, shopAccountCreation);

        return result;
    }
}
