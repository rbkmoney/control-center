import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { get } from 'lodash-es';

import {
    Questionary,
    QuestionaryData,
} from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../thrift-services/damsel/gen-model/claim_management';
import {
    toIndividualEntity,
    toLegalEntity,
    toRussianBankAccount,
    toShopDetails,
    toShopLocation,
} from './converters';

export interface ExtractForm {
    control: FormControl;
    path: string;
}

@Injectable()
export class ExtractPartyModificationsService {
    init(data: QuestionaryData) {
        return Object.keys(data).reduce(
            (acc, cur) =>
                cur === 'contact_info'
                    ? acc
                    : [
                          ...acc,
                          ...Object.keys(data[cur])
                              .map((k) => `${cur}.${k}`)
                              .map((path) => ({
                                  control: new FormControl(false),
                                  path,
                              })),
                      ],
            []
        );
    }

    mapToModifications(questionary: Questionary, forms: ExtractForm[]) {
        return forms
            .filter((f) => f.control.value)
            .map((f) => this.getModification(questionary, f.path));
    }

    private getModification(questionary: Questionary, path: string): PartyModification {
        const data = get(questionary.data, path);
        switch (path) {
            case 'contractor.individual_entity':
                return toIndividualEntity(data, questionary.data.bank_account);
            case 'contractor.legal_entity':
                return toLegalEntity(data, questionary.data.bank_account);
            case 'bank_account.russian_bank_account':
                return toRussianBankAccount(data);
            case 'shop_info.location':
                return toShopLocation(data);
            case 'shop_info.details':
                return toShopDetails(data);
        }
        return undefined;
    }
}
