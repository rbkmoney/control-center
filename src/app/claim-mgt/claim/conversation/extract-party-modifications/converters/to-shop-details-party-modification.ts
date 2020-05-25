import { ShopDetails as AnkShopDetails } from '../../../../../thrift-services/ank/gen-model/questionary';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { toShopModification } from './to-shop-modification';

export const toShopDetailsPartyModification = ({
    name,
    description,
}: AnkShopDetails): PartyModification =>
    toShopModification({ details_modification: { name, description } });
