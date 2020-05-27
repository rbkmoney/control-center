import get from 'lodash-es/get';
import * as uuid from 'uuid/v4';

import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { ExtractFormValue } from '../extract-form-value';

export const createShopCreation = (
    questionaryData: QuestionaryData,
    values: ExtractFormValue,
    contract_id: string,
    payout_tool_id: string
): PartyModification => {
    const defaultLocation = { url: '' };
    const location = get(values, "questionary['shop_info.location']", false)
        ? get(questionaryData, 'shop_info.location', defaultLocation)
        : defaultLocation;

    const defaultDetails = {
        name: '',
        description: '',
    };
    const details = get(values, "questionary['shop_info.details']", false)
        ? get(questionaryData, 'shop_info.details', defaultDetails)
        : defaultDetails;

    return {
        shop_modification: {
            id: uuid(),
            modification: {
                creation: {
                    contract_id,
                    payout_tool_id,
                    location,
                    details,
                    category: { id: values.category.id },
                },
            },
        },
    };
};
