import * as uuid from 'uuid/v4';

import { RussianBankAccount as AnkRussianBankAccount } from '../../../../../thrift-services/ank/gen-model/questionary';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { toContractModification } from './to-contract-modification';

export const toRussianBankAccountPartyModification = ({
    bank_name,
    bank_bik,
    bank_post_account,
    account,
}: AnkRussianBankAccount): PartyModification =>
    toContractModification({
        payout_tool_modification: {
            payout_tool_id: uuid(),
            modification: {
                creation: {
                    tool_info: {
                        russian_bank_account: {
                            account,
                            bank_name,
                            bank_bik,
                            bank_post_account,
                        },
                    },
                    currency: {
                        symbolic_code: 'RUB',
                    },
                },
            },
        },
    });
