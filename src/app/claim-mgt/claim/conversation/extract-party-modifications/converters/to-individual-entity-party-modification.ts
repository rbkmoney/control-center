import get from 'lodash-es/get';

import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { createRussianBankAccount } from '../creators/create-russian-bank-account';
import { toContractorModification } from './to-contractor-modification';

const path = 'contractor.individual_entity.russian_individual_entity';

export const toIndividualEntityPartyModification = (
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
                                `${path}.registration_info.individual_registration_info.ogrnip`,
                                ''
                            ) || '',
                        inn: get(questionaryData, `${path}.inn`, '') || '',
                        actual_address:
                            get(
                                questionaryData,
                                `${path}.registration_info.individual_registration_info.registration_place`,
                                ''
                            ) ||
                            get(
                                questionaryData,
                                `${path}.registration_info.legal_registration_info.registration_address`,
                                ''
                            ) ||
                            get(
                                questionaryData,
                                `${path}.registration_info.legal_registration_info.actual_address`,
                                ''
                            ) ||
                            get(
                                questionaryData,
                                `${path}.registration_info.individual_registration_info.registration_place`,
                                ''
                            ) ||
                            '',
                        post_address:
                            get(
                                questionaryData,
                                `${path}.russian_private_entity.residence_address`,
                                ''
                            ) ||
                            get(
                                questionaryData,
                                `${path}.registration_info.legal_registration_info.registration_address`,
                                ''
                            ) ||
                            get(
                                questionaryData,
                                `${path}.registration_info.legal_registration_info.actual_address`,
                                ''
                            ) ||
                            get(
                                questionaryData,
                                `${path}.registration_info.individual_registration_info.registration_place`,
                                ''
                            ) ||
                            '',
                        representative_position: '',
                        representative_full_name:
                            get(questionaryData, `${path}.russian_private_entity.fio`, '') || '',
                        representative_document:
                            get(
                                questionaryData,
                                `${path}.identity_document.russian_domestic_password.series_number`,
                                ''
                            ) || '',
                        russian_bank_account: createRussianBankAccount(questionaryData),
                    },
                },
            },
        },
        contractorID
    );
