import * as uuid from 'uuid/v4';

import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';

export const addShopCreation = (mods: PartyModification[]): PartyModification[] => {
    const payout_tool_id =
        mods.find(
            (m) =>
                m.contract_modification?.modification?.payout_tool_modification?.modification
                    ?.creation
        )?.contract_modification.modification.payout_tool_modification.payout_tool_id || '';
    const shopDetails = mods.find((m) => m.shop_modification?.modification?.details_modification)
        ?.shop_modification.modification.details_modification || {
        name: '',
        description: '',
    };
    const shopLocation = mods.find((m) => m.shop_modification?.modification?.location_modification)
        ?.shop_modification.modification.location_modification || { url: '' };

    const shopCreation: PartyModification = {
        shop_modification: {
            id: uuid(),
            modification: {
                creation: {
                    location: shopLocation,
                    details: shopDetails,
                    payout_tool_id,
                    category: { id: 1 },
                    contract_id: '',
                },
            },
        },
    };
    return [...mods, shopCreation];
};
