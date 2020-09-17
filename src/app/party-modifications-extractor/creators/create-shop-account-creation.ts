import { PartyModification } from '../../thrift-services/damsel/gen-model/claim_management';

export const createShopAccountCreation = (shopID: string): PartyModification => ({
    shop_modification: {
        id: shopID,
        modification: {
            shop_account_creation: { currency: { symbolic_code: 'RUB' } },
        },
    },
});
