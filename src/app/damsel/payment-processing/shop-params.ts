import { CategoryRef } from '../domain/category-ref';
import { ShopLocation } from '../domain/shop-location';
import { ShopDetails } from '../domain/shop-details';
import { ContractID } from '../domain/contract-id';
import { PayoutToolID } from '../domain/payout-tool-id';

export class ShopParams {
    category?: CategoryRef;
    location: ShopLocation;
    details: ShopDetails;
    contractId: ContractID;
    payoutToolId: PayoutToolID;
}
