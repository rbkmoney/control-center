import { PredicateType } from '../services/fetch-shop-providers/extract-terminal-infos';

export interface PredicateInfo {
    shopPartyContain: boolean;
    predicateType?: PredicateType;
    disabled?: boolean;
}
