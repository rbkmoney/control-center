import { getOr } from '../../../../../shared/utils';
import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { RussianBankAccount } from '../../../../../thrift-services/damsel/gen-model/domain';

const path = 'bank_account.russian_bank_account';

export const createRussianBankAccount = (d: QuestionaryData): RussianBankAccount => {
    const account = getOr(d, `${path}.account`, '');
    const bank_name = getOr(d, `${path}.bank_name`, '');
    const bank_bik = getOr(d, `${path}.bank_bik`, '');
    const bank_post_account = getOr(d, `${path}.bank_post_account`, '');
    return { account, bank_name, bank_bik, bank_post_account };
};
