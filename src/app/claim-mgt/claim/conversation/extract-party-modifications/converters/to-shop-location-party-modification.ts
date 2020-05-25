import { ShopLocation as AnkShopLocation } from '../../../../../thrift-services/ank/gen-model/questionary';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { toShopModification } from './to-shop-modification';

export const toShopLocationPartyModification = ({ url }: AnkShopLocation): PartyModification =>
    toShopModification({ location_modification: { url } });
