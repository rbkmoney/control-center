import { getOr } from '../../../../../shared/utils';
import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { createRussianBankAccount } from '../creators/create-russian-bank-account';
import { toContractorModification } from './to-contractor-modification';

const path = 'contractor.individual_entity.russian_individual_entity';

export const toIndividualEntityPartyModification = (
    d: QuestionaryData,
    contractorID: string
): PartyModification =>
    toContractorModification(
        {
            creation: {
                legal_entity: {
                    russian_legal_entity: {
                        registered_name: getOr(d, `${path}.name`, ''),
                        registered_number: getOr(
                            d,
                            `${path}.registration_info.individual_registration_info.ogrnip`,
                            ''
                        ),
                        inn: getOr(d, `${path}.inn`, '') || '',
                        actual_address: getOr(
                            d,
                            `${path}.registration_info.individual_registration_info.registration_place`,
                            ''
                        ),
                        post_address: getOr(
                            d,
                            `${path}.registration_info.individual_registration_info.registration_place`,
                            ''
                        ),
                        representative_position: '',
                        representative_full_name: getOr(
                            d,
                            `${path}.russian_private_entity.fio`,
                            ''
                        ),
                        representative_document: getOr(
                            d,
                            `${path}.identity_document.russian_domestic_password.series_number`,
                            ''
                        ),
                        russian_bank_account: createRussianBankAccount(d),
                    },
                },
            },
        },
        contractorID
    );
