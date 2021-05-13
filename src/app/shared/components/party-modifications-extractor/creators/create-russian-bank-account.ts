import { getOr } from '@cc/utils/get-or';

import { QuestionaryData } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { RussianBankAccount } from '../../../../thrift-services/damsel/gen-model/domain';

const PATH = 'bank_account.russian_bank_account';

export const createRussianBankAccount = (d: QuestionaryData): RussianBankAccount => {
    const russianBankAccount = getOr(d, PATH, null);
    const account = getOr(russianBankAccount, `account`, '');
    const bankName = getOr(russianBankAccount, `bank_name`, '');
    const bankBik = getOr(russianBankAccount, `bank_bik`, '');
    const bankPostAccount = getOr(russianBankAccount, `bank_post_account`, '');
    return { account, bank_name: bankName, bank_bik: bankBik, bank_post_account: bankPostAccount };
};
