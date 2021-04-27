import { QuestionaryData } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { createInternationalBankAccount } from './create-international-bank-account';
import { createRussianBankAccount } from './create-russian-bank-account';

export const createPayoutToolCreation = (
    d: QuestionaryData,
    contractId: string,
    payoutToolId: string
): PartyModification => ({
    contract_modification: {
        id: contractId,
        modification: {
            payout_tool_modification: {
                payout_tool_id: payoutToolId,
                modification: {
                    creation: {
                        currency: {
                            symbolic_code: 'RUB',
                        },
                        tool_info: {
                            russian_bank_account: d.bank_account?.russian_bank_account
                                ? createRussianBankAccount(d)
                                : undefined,
                            international_bank_account: d.bank_account?.international_bank_account
                                ? createInternationalBankAccount(d)
                                : undefined,
                        },
                    },
                },
            },
        },
    },
});
