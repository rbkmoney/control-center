import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import get from 'lodash-es/get';

import {
    Questionary,
    QuestionaryData,
} from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../thrift-services/damsel/gen-model/claim_management';
import {
    addShopCreation,
    toIndividualEntityPartyModification,
    toLegalEntityPartyModification,
    toRussianBankAccountPartyModification,
    toShopDetailsPartyModification,
    toShopLocationPartyModification,
} from './converters';

export interface ExtractForm {
    control: FormControl;
    path: string;
}

@Injectable()
export class ExtractPartyModificationsService {
    createShop = new FormControl(false);

    createForms(data: QuestionaryData) {
        return Object.keys(data).reduce((acc, cur) => {
            if (cur === 'contact_info' || !data[cur]) {
                return acc;
            } else {
                return [
                    ...acc,
                    ...Object.keys(data[cur])
                        .filter((k) => data[cur][k])
                        .map((k) => ({
                            control: new FormControl(true),
                            path: `${cur}.${k}`,
                        })),
                ];
            }
        }, []);
    }

    mapToModifications(questionary: Questionary, forms: ExtractForm[]) {
        const mods = forms
            .filter((f) => f.control.value)
            .map((f) => this.getModification(questionary, f.path));
        return this.createShop.value ? addShopCreation(mods) : mods;
    }

    private getModification(questionary: Questionary, path: string): PartyModification {
        const data = get(questionary.data, path);
        switch (path) {
            case 'contractor.individual_entity':
                return toIndividualEntityPartyModification(data, questionary.data.bank_account);
            case 'contractor.legal_entity':
                return toLegalEntityPartyModification(data, questionary.data.bank_account);
            case 'bank_account.russian_bank_account':
                return toRussianBankAccountPartyModification(data);
            case 'shop_info.location':
                return toShopLocationPartyModification(data);
            case 'shop_info.details':
                return toShopDetailsPartyModification(data);
        }
        return undefined;
    }
}
