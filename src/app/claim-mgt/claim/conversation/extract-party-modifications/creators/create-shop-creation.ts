import { getOr } from '../../../../../shared/utils';
import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';

export const createShopCreation = (
    d: QuestionaryData,
    contract_id: string,
    payout_tool_id: string,
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
                    contract_id,
                    payout_tool_id,
                    location,
                    details,
                    category: { id: categoryID },
                },
            },
        },
    };
};
