import { getOr } from '@cc/utils/get-or';

import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { InternationalBankAccount } from '../../../../../thrift-services/damsel/gen-model/domain';

const PATH = 'bank_account.international_bank_account';

export const createInternationalBankAccount = (d: QuestionaryData): InternationalBankAccount => {
    const internationalBankAccount = getOr(d, PATH, null);
    const accountNumber = getOr(internationalBankAccount, `number`, '');
    const bank = getOr(internationalBankAccount, `bank`, '');
    const correspondentAccount = getOr(internationalBankAccount, `correspondent_account`, '');
    const iban = getOr(internationalBankAccount, `iban`, '');
    const accountHolder = getOr(internationalBankAccount, `account_holder`, '');
    return {
        number: accountNumber,
        bank,
        correspondent_account: correspondentAccount,
        iban,
        account_holder: accountHolder,
    };
};
