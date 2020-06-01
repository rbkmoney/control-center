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
        params: this.fb.group({
            contractCreation: true,
            payoutToolCreation: true,
            shopCreation: true,
        }),
        category: this.fb.group({}),
        payment_institution: this.fb.group({}),
    });

    constructor(private fb: FormBuilder) {}

    mapToModifications(d: QuestionaryData): PartyModification[] {
        const {
            params: { contractCreation, payoutToolCreation, shopCreation },
            category,
            payment_institution,
        }: ExtractFormValue = this.form.value;
        const shopID = shopCreation ? uuid() : '';
        const contractID = contractCreation ? uuid() : '';
        const contractorID = contractCreation ? uuid() : '';
        const payoutToolID = payoutToolCreation ? uuid() : '';

        const result = [];

        if (contractCreation) {
            const contractorCreationModification = createContractor(d, contractorID);
            const contractCreationModification = createContractCreation(
                d,
                contractorID,
                contractID,
                payment_institution
            );
            result.push(contractorCreationModification, contractCreationModification);
        }

        if (payoutToolCreation) {
            const payoutToolCreationModification = createPayoutToolCreation(
                d,
                contractID,
                payoutToolID
            );
            result.push(payoutToolCreationModification);
        }

        if (shopCreation) {
            const shopCreationModification = createShopCreation(
                d,
                contractID,
                payoutToolID,
                category.id,
                shopID
            );
            const shopAccountCreation = createShopAccountCreation(shopID);
            result.push(shopCreationModification, shopAccountCreation);
        }

        return result;
    }
}
