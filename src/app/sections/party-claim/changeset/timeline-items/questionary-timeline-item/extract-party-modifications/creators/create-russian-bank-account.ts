import { getOr } from '../../../../../../../shared/utils';
import { QuestionaryData } from '../../../../../../../thrift-services/ank/gen-model/questionary_manager';
import { RussianBankAccount } from '../../../../../../../thrift-services/damsel/gen-model/domain';

const path = 'bank_account.russian_bank_account';

export const createRussianBankAccount = (d: QuestionaryData): RussianBankAccount => {
    const russianBankAccount = getOr(d, path, null);
    const account = getOr(russianBankAccount, `account`, '');
    const bank_name = getOr(russianBankAccount, `bank_name`, '');
    const bank_bik = getOr(russianBankAccount, `bank_bik`, '');
    const bank_post_account = getOr(russianBankAccount, `bank_post_account`, '');
    return { account, bank_name, bank_bik, bank_post_account };
};
