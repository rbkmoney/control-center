import get from 'lodash-es/get';

import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { createRussianBankAccount } from '../creators/create-russian-bank-account';
import { toContractorModification } from './to-contractor-modification';

export const toLegalEntityPartyModification = (
    questionaryData: QuestionaryData,
    contractorID: string
): PartyModification =>
    toContractorModification(
        {
            creation: {
                legal_entity: {
                    russian_legal_entity: {
                        registered_name:
                            get(
                                questionaryData,
                                'contractor.legal_entity.russian_legal_entity.name',
                                ''
                            ) || '',
                        registered_number:
                            get(
                                questionaryData,
                                'contractor.legal_entity.russian_legal_entity.registration_info.legal_registration_info.ogrn',
                                ''
                            ) || '',
                        inn:
                            get(
                                questionaryData,
                                'contractor.legal_entity.russian_legal_entity.inn',
                                ''
                            ) || '',
                        actual_address:
                            get(
                                questionaryData,
                                'contractor.legal_entity.russian_legal_entity.registration_info.legal_registration_info.actual_address',
                                ''
                            ) || '',
                        post_address:
                            get(
                                questionaryData,
                                'contractor.legal_entity.russian_legal_entity.postal_address',
                                ''
                            ) || '',
                        representative_position:
                            get(
                                questionaryData,
                                'contractor.legal_entity.russian_legal_entity.legal_owner_info.head_position',
                                ''
                            ) || '',
                        representative_full_name:
                            get(
                                questionaryData,
                                'contractor.legal_entity.russian_legal_entity.legal_owner_info.russian_private_entity.fio',
                                ''
                            ) || '',
                        representative_document:
                            get(
                                questionaryData,
                                'contractor.legal_entity.russian_legal_entity.legal_owner_info.identity_document.russian_domestic_password.series_number',
                                ''
                            ) || '',
                        russian_bank_account: createRussianBankAccount(questionaryData),
                    },
                },
            },
        },
        contractorID
    );
