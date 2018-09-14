import { ShopID } from './shop-id';
import { Bloking } from './bloking';
import { ShopDetails } from './shop-details';
import { ShopLocation } from './shop-location';
import { CategoryRef } from './category-ref';
import { ContractID } from './contract-id';
import { PayoutToolID } from './payout-tool-id';
import { BusinessScheduleRef } from './business-schedule-ref';
import { Suspension } from './suspension';
import { ShopAccount } from './shop-account';

export class Shop {
    id: ShopID;
    createdAt: string;
    blocking: Bloking;
    suspension: Suspension;
    details: ShopDetails;
    location: ShopLocation;
    category: CategoryRef;
    account: ShopAccount;
    contractId: ContractID;
    payoutToolId?: PayoutToolID;
    payoutSchedule?: BusinessScheduleRef;
}
