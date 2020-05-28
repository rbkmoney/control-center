import get from 'lodash-es/get';

import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { RussianBankAccount } from '../../../../../thrift-services/damsel/gen-model/domain';

const path = 'bank_account.russian_bank_account';

export const createRussianBankAccount = (questionaryData: QuestionaryData): RussianBankAccount => {
    const account = get(questionaryData, `${path}.account`, '') || '';
    const bank_name = get(questionaryData, `${path}.bank_name`, '') || '';
    const bank_bik = get(questionaryData, `${path}.bank_bik`, '') || '';
    const bank_post_account = get(questionaryData, `${path}.bank_post_account`, '') || '';
    return { account, bank_name, bank_bik, bank_post_account };
};
