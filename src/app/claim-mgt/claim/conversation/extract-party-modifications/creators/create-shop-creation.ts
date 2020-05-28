import get from 'lodash-es/get';
import * as uuid from 'uuid/v4';

import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';

export const createShopCreation = (
    questionaryData: QuestionaryData,
    contract_id: string,
    payout_tool_id: string,
    categoryID: number,
    shopID: string = uuid()
): PartyModification => {
    const defaultLocation = { url: '' };
    const location = get(questionaryData, 'shop_info.location', defaultLocation) || defaultLocation;

    const defaultDetails = {
        name: '',
        description: '',
    };
    const details = get(questionaryData, 'shop_info.details', defaultDetails) || defaultDetails;

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
