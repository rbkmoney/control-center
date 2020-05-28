import get from 'lodash-es/get';

import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { createRussianBankAccount } from '../creators/create-russian-bank-account';
import { toContractorModification } from './to-contractor-modification';

const path = 'contractor.legal_entity.russian_legal_entity';

export const toLegalEntityPartyModification = (
    questionaryData: QuestionaryData,
    contractorID: string
): PartyModification =>
    toContractorModification(
        {
            creation: {
                legal_entity: {
                    russian_legal_entity: {
                        registered_name: get(questionaryData, `${path}.name`, '') || '',
                        registered_number:
                            get(
                                questionaryData,
                                `${path}.registration_info.legal_registration_info.ogrn`,
                                ''
                            ) || '',
                        inn: get(questionaryData, `${path}.inn`, '') || '',
                        actual_address:
                            get(
                                questionaryData,
                                `${path}.registration_info.legal_registration_info.actual_address`,
                                ''
                            ) ||
                            get(
                                questionaryData,
                                `${path}.registration_info.legal_registration_info.registration_address`,
                                ''
                            ) ||
                            '',
                        post_address:
                            get(questionaryData, `${path}.postal_address`, '') ||
                            get(
                                questionaryData,
                                `${path}.registration_info.legal_registration_info.registration_address`,
                                ''
                            ) ||
                            '',
                        representative_position:
                            get(questionaryData, `${path}.legal_owner_info.head_position`, '') ||
                            '',
                        representative_full_name:
                            get(
                                questionaryData,
                                `${path}.legal_owner_info.russian_private_entity.fio`,
                                ''
                            ) || '',
                        representative_document:
                            get(
                                questionaryData,
                                `${path}.legal_owner_info.identity_document.russian_domestic_password.series_number`,
                                ''
                            ) || '',
                        russian_bank_account: createRussianBankAccount(questionaryData),
                    },
                },
            },
        },
        contractorID
    );
