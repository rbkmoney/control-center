import { getOr } from '@cc/utils/get-or';

import { QuestionaryData } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../thrift-services/damsel/gen-model/claim_management';

export const createShopCreation = (
    d: QuestionaryData,
    contractId: string,
    payoutToolId: string,
    categoryID: number,
    shopID: string
): PartyModification => {
    const defaultLocation = { url: '' };
    const location = getOr(d, 'shop_info.location', defaultLocation);

    const defaultDetails = {
        name: '',
        description: '',
    };
    const details = getOr(d, 'shop_info.details', defaultDetails);

    return {
        shop_modification: {
            id: shopID,
            modification: {
                creation: {
                    contract_id: contractId,
                    payout_tool_id: payoutToolId,
                    location,
                    details,
                    category: { id: categoryID },
                },
            },
        },
    };
};
