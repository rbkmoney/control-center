import get from 'lodash-es/get';

import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { RussianBankAccount } from '../../../../../thrift-services/damsel/gen-model/domain';

export const createRussianBankAccount = (
    questionaryData: QuestionaryData,
    needAddBankAccount: boolean
): RussianBankAccount => {
    const account = needAddBankAccount
        ? get(questionaryData, 'bank_account.russian_bank_account.account', '')
        : '';
    const bank_name = needAddBankAccount
        ? get(questionaryData, 'bank_account.russian_bank_account.bank_name', '')
        : '';
    const bank_bik = needAddBankAccount
        ? get(questionaryData, 'bank_account.russian_bank_account.bank_bik', '')
        : '';
    const bank_post_account = needAddBankAccount
        ? get(questionaryData, 'bank_account.russian_bank_account.bank_post_account', '')
        : '';
    return { account, bank_name, bank_bik, bank_post_account };
};
