import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuestionaryData } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import {
    createContractCreation,
    createContractorsModifications,
    createPayoutToolCreation,
    createShopCreation,
} from './creators';

@Injectable()
export class ExtractPartyModificationsService {
    form: FormGroup = this.fb.group({
        category: this.fb.group({}),
        questionary: this.fb.group({}),
    });

    constructor(private fb: FormBuilder) {}

    createForms(data: QuestionaryData) {
        Object.keys(data)
            .reduce((acc, cur) => {
                if (cur === 'contact_info' || !data[cur]) {
                    return acc;
                } else {
                    return [
                        ...acc,
                        ...Object.keys(data[cur])
                            .filter((k) => data[cur][k])
                            .reduce((acc2, k) => {
                                return [...acc2, `${cur}.${k}`];
                            }, []),
                    ];
                }
            }, [])
            .forEach((p) =>
                (this.form.controls.questionary as FormGroup).registerControl(
                    p,
                    this.fb.control(true)
                )
            );
    }

    mapToModifications(questionaryData: QuestionaryData) {
        const contractCreation = createContractCreation();
        const payoutToolCreation = createPayoutToolCreation(
            questionaryData,
            this.form.value.questionary['bank_account.russian_bank_account'],
            contractCreation.contract_modification.id
        );
        const shopCreation = createShopCreation(
            questionaryData,
            this.form.value,
            contractCreation.contract_modification.id,
            payoutToolCreation.contract_modification.modification.payout_tool_modification
                .payout_tool_id
        );
        const contractorsModifications = createContractorsModifications(
            questionaryData,
            this.form.value
        );
        return [contractCreation, payoutToolCreation, shopCreation, ...contractorsModifications];
    }
}
