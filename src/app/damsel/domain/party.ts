import { ContractID } from './contract-id';
import { ShopID } from './shop-id';
import { Contract } from './contract';
import { ContractorID } from './contractor-id';
import { Contractor } from './contarctor';
import { Shop } from './shop';

export class Party {
    id: string;
    createdAt: string;
    revision: number;
    contracts: Map<ContractID, Contract>;
    shops: Map<ShopID, Shop>;
    contractors: Map<ContractorID, Contractor>;

    // TODO type this later...
    wallets: Map<any, any>;
    contactInfo: any;
    blocking: any;
    suspension: any;
}
