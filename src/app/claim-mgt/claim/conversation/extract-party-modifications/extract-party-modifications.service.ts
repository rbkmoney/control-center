import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as uuid from 'uuid/v4';

import { QuestionaryData } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { createContractCreation, createPayoutToolCreation, createShopCreation } from './creators';
import { createContractor } from './creators/create-contractor';
import { createShopAccountCreation } from './creators/create-shop-account-creation';
import { ExtractFormValue } from './extract-form-value';

@Injectable()
export class ExtractPartyModificationsService {
    form = this.fb.group({
        category: this.fb.group({}),
        payment_institution: this.fb.group({}),
        contractor: this.fb.group({})
    });

    constructor(private fb: FormBuilder) {
        this.form.valueChanges.subscribe(q => console.log(q));
    }

    mapToModifications(d: QuestionaryData): PartyModification[] {
        const {
            category,
            payment_institution
        }: ExtractFormValue = this.form.value;
        const shopID = uuid();
        const contractID = uuid();
        const contractorID = uuid();
        const payoutToolID = uuid();

        const result = [];

        const contractorCreationModification = createContractor(d, contractorID);
        const contractCreationModification = createContractCreation(
            d,
            contractorID,
            contractID,
            payment_institution
        );
        result.push(contractorCreationModification, contractCreationModification);

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
