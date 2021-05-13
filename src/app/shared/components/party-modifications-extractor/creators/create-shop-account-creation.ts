import { PartyModification } from '../../../../thrift-services/damsel/gen-model/claim_management';

export const createShopAccountCreation = (shopId: string): PartyModification => ({
    shop_modification: {
        id: shopId,
        modification: {
            shop_account_creation: { currency: { symbolic_code: 'RUB' } },
        },
    },
});
