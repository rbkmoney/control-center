import { getOr } from '@cc/utils/get-or';

import { QuestionaryData } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { RussianLegalEntity } from '../../../../thrift-services/damsel/gen-model/domain';
import { createRussianBankAccount } from '../creators/create-russian-bank-account';

const PATH = 'contractor.legal_entity.russian_legal_entity';

export const toRussianLegalEntity = (d: QuestionaryData): RussianLegalEntity => ({
    registered_name: getOr(d, `${PATH}.name`, ''),
    registered_number: getOr(d, `${PATH}.registration_info.legal_registration_info.ogrn`, ''),
    inn: getOr(d, `${PATH}.inn`, ''),
    actual_address:
        getOr(d, `${PATH}.registration_info.legal_registration_info.actual_address`, '') ||
        getOr(d, `${PATH}.registration_info.legal_registration_info.registration_address`, ''),
    post_address:
        getOr(d, `${PATH}.postal_address`, '') ||
        getOr(d, `${PATH}.registration_info.legal_registration_info.registration_address`, ''),
    representative_position: getOr(d, `${PATH}.legal_owner_info.head_position`, ''),
    representative_full_name: getOr(d, `${PATH}.legal_owner_info.russian_private_entity.fio`, ''),
    representative_document: getOr(
        d,
        `${PATH}.legal_owner_info.identity_document.russian_domestic_password.series_number`,
        ''
    ),
    russian_bank_account: createRussianBankAccount(d),
});
