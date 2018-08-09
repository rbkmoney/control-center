import { ShopParams } from './shop-params';
import { CategoryRef } from '../domain/category-ref';
import { ShopDetails } from '../domain/shop-details';
import { PayoutToolID } from '../domain/payout-tool-id';
import { ShopLocation } from '../domain/shop-location';
import { ShopContractModification } from './shop-contract-modification';
import { ProxyModification } from './proxy-modification';
import { ShopAccountParams } from './shop-account-params';
import { ScheduleModification } from './schedule-modification';

export class ShopModification {
    creation?: ShopParams;
    categoryModification?: CategoryRef;
    detailsModification?: ShopDetails;
    contractModification?: ShopContractModification;
    payoutToolModification?: PayoutToolID;
    locationModification?: ShopLocation;
    shopAccountCreation?: ShopAccountParams;
    payoutScheduleModification?: ScheduleModification;

    // deprecated
    proxyModification?: ProxyModification;
}
