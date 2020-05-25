import {
    BankAccount,
    IndividualEntity,
} from '../../../../../thrift-services/ank/gen-model/questionary';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { toContractorModification } from './to-contractor-modification';

export const toIndividualEntityPartyModification = (
    { russian_individual_entity }: IndividualEntity,
    bank_account: BankAccount
): PartyModification =>
    toContractorModification({
        creation: {
            legal_entity: {
                russian_legal_entity: {
                    registered_name: russian_individual_entity.name || '',
                    registered_number:
                        russian_individual_entity.registration_info?.individual_registration_info
                            ?.ogrnip || '',
                    inn: russian_individual_entity.inn || '',
                    actual_address:
                        russian_individual_entity.registration_info?.individual_registration_info
                            ?.registration_place || '',
                    post_address:
                        russian_individual_entity.russian_private_entity?.residence_address || '',
                    representative_position: '',
                    representative_full_name:
                        russian_individual_entity.russian_private_entity?.fio || '',
                    representative_document:
                        russian_individual_entity.identity_document?.russian_domestic_password
                            ?.series_number || '',
                    russian_bank_account: {
                        account: bank_account?.russian_bank_account?.account || '',
                        bank_name: bank_account?.russian_bank_account?.bank_name || '',
                        bank_bik: bank_account?.russian_bank_account?.bank_bik || '',
                        bank_post_account:
                            bank_account?.russian_bank_account?.bank_post_account || '',
                    },
                },
            },
        },
    });
