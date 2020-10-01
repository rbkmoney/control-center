import { getOr, getUnionValue } from '@cc/utils/index';

import { Modification } from '../../../thrift-services/damsel/gen-model/claim_management';
import { PartyTarget } from '../party-target';
import { SelectableItem } from './selectable-item';

export const modificationsToSelectableItems = (
    mods: Modification[],
    target: PartyTarget
): SelectableItem[] =>
    mods
        .filter((mod) => {
            switch (target) {
                case PartyTarget.contract:
                    return !!getOr(
                        mod,
                        'party_modification.contract_modification.modification.creation',
                        false
                    );
                case PartyTarget.contractor:
                    return !!getOr(
                        mod,
                        'party_modification.contractor_modification.modification.creation',
                        false
                    );
                case PartyTarget.shop:
                    return !!getOr(
                        mod,
                        'party_modification.shop_modification.modification.creation',
                        false
                    );
            }
        })
        .map((mod) => {
            const data = getUnionValue(getUnionValue(mod)) as any;
            return {
                id: getOr(data, 'id', null),
                data,
                fromClaim: true,
            };
        });
