import { getOr } from '../../../../../utils';
import { QuestionaryData } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { InternationalBankAccount } from '../../../../thrift-services/damsel/gen-model/domain';

const path = 'bank_account.international_bank_account';

export const createInternationalBankAccount = (d: QuestionaryData): InternationalBankAccount => {
    const internationalBankAccount = getOr(d, path, null);
    const accountNumber = getOr(internationalBankAccount, `number`, '');
    const bank = getOr(internationalBankAccount, `bank`, '');
    const correspondent_account = getOr(internationalBankAccount, `correspondent_account`, '');
    const iban = getOr(internationalBankAccount, `iban`, '');
    const account_holder = getOr(internationalBankAccount, `account_holder`, '');
    return { number: accountNumber, bank, correspondent_account, iban, account_holder };
};
