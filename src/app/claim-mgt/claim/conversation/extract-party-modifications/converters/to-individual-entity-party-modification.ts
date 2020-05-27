import get from 'lodash-es/get';

import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { createRussianBankAccount } from '../creators/create-russian-bank-account';
import { toContractorModification } from './to-contractor-modification';

export const toIndividualEntityPartyModification = (
    questionaryData: QuestionaryData,
    needAddBankAccount: boolean
): PartyModification =>
    toContractorModification({
        creation: {
            legal_entity: {
                russian_legal_entity: {
                    registered_name: get(
                        questionaryData,
                        'contractor.individual_entity.russian_individual_entity.name',
                        ''
                    ),
                    registered_number: get(
                        questionaryData,
                        'contractor.individual_entity.russian_individual_entity.registration_info.individual_registration_info.ogrnip',
                        ''
                    ),
                    inn: get(
                        questionaryData,
                        'contractor.individual_entity.russian_individual_entity.inn',
                        ''
                    ),
                    actual_address: get(
                        questionaryData,
                        'contractor.individual_entity.russian_individual_entity.registration_info.individual_registration_info.registration_place',
                        ''
                    ),
                    post_address: get(
                        questionaryData,
                        'contractor.individual_entity.russian_individual_entity.russian_private_entity.residence_address',
                        ''
                    ),
                    representative_position: '',
                    representative_full_name: get(
                        questionaryData,
                        'contractor.individual_entity.russian_individual_entity.russian_private_entity.fio',
                        ''
                    ),
                    representative_document: get(
                        questionaryData,
                        'contractor.individual_entity.russian_individual_entity.identity_document.russian_domestic_password.series_number',
                        ''
                    ),
                    russian_bank_account: createRussianBankAccount(
                        questionaryData,
                        needAddBankAccount
                    ),
                },
            },
        },
    });
