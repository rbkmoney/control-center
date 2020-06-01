import { getOr } from '../../../../../shared/utils';
import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { createRussianBankAccount } from '../creators/create-russian-bank-account';
import { toContractorModification } from './to-contractor-modification';

const path = 'contractor.legal_entity.russian_legal_entity';

export const toLegalEntityPartyModification = (
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
                            `${path}.registration_info.legal_registration_info.ogrn`,
                            ''
                        ),
                        inn: getOr(d, `${path}.inn`, ''),
                        actual_address:
                            getOr(
                                d,
                                `${path}.registration_info.legal_registration_info.actual_address`,
                                ''
                            ) ||
                            getOr(
                                d,
                                `${path}.registration_info.legal_registration_info.registration_address`,
                                ''
                            ),
                        post_address:
                            getOr(d, `${path}.postal_address`, '') ||
                            getOr(
                                d,
                                `${path}.registration_info.legal_registration_info.registration_address`,
                                ''
                            ),
                        representative_position: getOr(
                            d,
                            `${path}.legal_owner_info.head_position`,
                            ''
                        ),
                        representative_full_name: getOr(
                            d,
                            `${path}.legal_owner_info.russian_private_entity.fio`,
                            ''
                        ),
                        representative_document: getOr(
                            d,
                            `${path}.legal_owner_info.identity_document.russian_domestic_password.series_number`,
                            ''
                        ),
                        russian_bank_account: createRussianBankAccount(d),
                    },
                },
            },
        },
        contractorID
    );
