import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { get } from 'lodash-es';
import * as uuid from 'uuid/v4';

import { RussianLegalEntity } from '../../../../thrift-services/ank/gen-model/questionary';
import {
    Questionary,
    QuestionaryData,
} from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { RussianBankAccount } from '../../../../thrift-services/damsel/gen-model/domain';
import { toRussianBankAccount, toShopDetails, toShopLocation } from './converters';

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
        console.log(path);
        console.log(data);
        let russian_legal_entity: RussianLegalEntity;
        switch (path) {
            case 'contractor.individual_entity':
                russian_legal_entity = data.russian_legal_entity;
                return {
                    contractor_modification: {
                        id: uuid(),
                        modification: {
                            creation: {
                                legal_entity: {
                                    russian_legal_entity: {
                                        registered_name:
                                            russian_legal_entity.name +
                                            russian_legal_entity.additional_info.bank_account
                                                .russian_bank_account,
                                        registered_number: 'registered_number',
                                        inn: russian_legal_entity.inn,
                                        actual_address:
                                            russian_legal_entity.registration_info
                                                .legal_registration_info.actual_address,
                                        post_address: russian_legal_entity.postal_address,
                                        representative_position: 'representative_position',
                                        representative_full_name: 'representative_full_name',
                                        representative_document: 'representative_document',
                                        russian_bank_account: russian_legal_entity.additional_info
                                            .bank_account
                                            .russian_bank_account as RussianBankAccount,
                                    },
                                },
                            },
                        },
                    },
                };
            case 'contractor.legal_entity':
                russian_legal_entity = data.russian_legal_entity;
                return {
                    contractor_modification: {
                        id: uuid(),
                        modification: {
                            creation: {
                                legal_entity: {
                                    russian_legal_entity: {
                                        registered_name:
                                            russian_legal_entity.name +
                                            russian_legal_entity.additional_info.bank_account
                                                .russian_bank_account,
                                        registered_number: 'registered_number',
                                        inn: russian_legal_entity.inn,
                                        actual_address:
                                            russian_legal_entity.registration_info
                                                .legal_registration_info.actual_address,
                                        post_address: russian_legal_entity.postal_address,
                                        representative_position: 'representative_position',
                                        representative_full_name: 'representative_full_name',
                                        representative_document: 'representative_document',
                                        russian_bank_account: russian_legal_entity.additional_info
                                            .bank_account
                                            .russian_bank_account as RussianBankAccount,
                                    },
                                },
                            },
                        },
                    },
                };
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
