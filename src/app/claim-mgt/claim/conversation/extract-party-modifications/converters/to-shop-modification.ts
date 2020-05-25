import * as uuid from 'uuid/v4';

import {
    PartyModification,
    ShopModification,
} from '../../../../../thrift-services/damsel/gen-model/claim_management';

export const toShopModification = (
    modification: ShopModification,
    id?: string
): PartyModification => ({
    shop_modification: {
        id: id ? id : uuid(),
        modification,
    },
});
