import { getOr } from '../../../../../shared/utils';
import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { RussianLegalEntity } from '../../../../../thrift-services/damsel/gen-model/domain';
import { createRussianBankAccount } from '../creators/create-russian-bank-account';

const path = 'contractor.legal_entity.russian_legal_entity';

export const toRussianLegalEntity = (d: QuestionaryData): RussianLegalEntity => ({
    registered_name: getOr(d, `${path}.name`, ''),
    registered_number: getOr(d, `${path}.registration_info.legal_registration_info.ogrn`, ''),
    inn: getOr(d, `${path}.inn`, ''),
    actual_address:
        getOr(d, `${path}.registration_info.legal_registration_info.actual_address`, '') ||
        getOr(d, `${path}.registration_info.legal_registration_info.registration_address`, ''),
    post_address:
        getOr(d, `${path}.postal_address`, '') ||
        getOr(d, `${path}.registration_info.legal_registration_info.registration_address`, ''),
    representative_position: getOr(d, `${path}.legal_owner_info.head_position`, ''),
    representative_full_name: getOr(d, `${path}.legal_owner_info.russian_private_entity.fio`, ''),
    representative_document: getOr(
        d,
        `${path}.legal_owner_info.identity_document.russian_domestic_password.series_number`,
        ''
    ),
    russian_bank_account: createRussianBankAccount(d),
});
