import * as uuid from 'uuid/v4';

import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { createRussianBankAccount } from './create-russian-bank-account';

export const createPayoutToolCreation = (
    questionaryData: QuestionaryData,
    needAddBankAccount: boolean,
    contractID: string
): PartyModification => ({
    contract_modification: {
        id: contractID,
        modification: {
            payout_tool_modification: {
                payout_tool_id: uuid(),
                modification: {
                    creation: {
                        currency: {
                            symbolic_code: 'RUB',
                        },
                        tool_info: {
                            russian_bank_account: createRussianBankAccount(
                                questionaryData,
                                needAddBankAccount
                            ),
                        },
                    },
                },
            },
        },
    },
});
