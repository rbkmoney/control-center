import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { get } from 'lodash-es';

import { QuestionaryData } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { createContractCreation, createPayoutToolCreation, createShopCreation } from './creators';
import { createContractor } from './creators/create-contractor';
import { ExtractFormValue } from './extract-form-value';

@Injectable()
export class ExtractPartyModificationsService {
    form: FormGroup = this.fb.group({
        category: this.fb.group({}),
        mods: this.fb.group({
            contractCreation: new FormControl(true),
            payoutToolCreation: new FormControl(true),
            shopCreation: new FormControl(true),
        }),
    });

    constructor(private fb: FormBuilder) {}

    mapToModifications(questionaryData: QuestionaryData) {
        const { mods, category }: ExtractFormValue = this.form.value;

        const contractorCreation = mods.contractCreation ? createContractor(questionaryData) : null;
        const contractCreation = mods.contractCreation
            ? createContractCreation(
                  questionaryData,
                  get(contractorCreation, 'contractor_modification.id', '')
              )
            : null;
        const payoutToolCreation = mods.payoutToolCreation
            ? createPayoutToolCreation(
                  questionaryData,
                  get(contractCreation, 'contract_modification.id', '')
              )
            : null;
        const shopCreation = mods.shopCreation
            ? createShopCreation(
                  questionaryData,
                  get(contractCreation, 'contract_modification.id', ''),
                  get(
                      payoutToolCreation,
                      'contract_modification.modification.payout_tool_modification.payout_tool_id',
                      ''
                  ),
                  category.id
              )
            : null;

        return [contractorCreation, contractCreation, payoutToolCreation, shopCreation].filter(
            (i) => !!i
        );
    }
}
