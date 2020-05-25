import { BankAccount, LegalEntity } from '../../../../../thrift-services/ank/gen-model/questionary';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { RussianBankAccount } from '../../../../../thrift-services/damsel/gen-model/domain';
import { toContractorModification } from './to-contractor-modification';

export const toLegalEntity = (
    { russian_legal_entity }: LegalEntity,
    bank_account: BankAccount
): PartyModification =>
    toContractorModification({
        creation: {
            legal_entity: {
                russian_legal_entity: {
                    registered_name: russian_legal_entity.name,
                    registered_number:
                        russian_legal_entity.registration_info.legal_registration_info.ogrn || '',
                    inn: russian_legal_entity.inn,
                    actual_address:
                        russian_legal_entity.registration_info.legal_registration_info
                            .actual_address ||
                        russian_legal_entity.registration_info.legal_registration_info
                            .registration_address,
                    post_address: russian_legal_entity.postal_address || '',
                    representative_position: russian_legal_entity.legal_owner_info.head_position,
                    representative_full_name:
                        russian_legal_entity.legal_owner_info.russian_private_entity.fio,
                    representative_document:
                        russian_legal_entity.legal_owner_info.identity_document
                            .russian_domestic_password.series_number,
                    russian_bank_account: bank_account.russian_bank_account as RussianBankAccount,
                },
            },
        },
    });
