import { ChangesetInfo } from '../../../sections/party-claim/changeset/changeset-infos';
import { getOr } from '../../../shared/utils';
import { PartyTarget } from '../party-target';
import { SelectableItem } from './selectable-item';

export const changesetInfosToSelectableItems = (
    infos: ChangesetInfo[],
    target: PartyTarget
): SelectableItem[] =>
    infos
        .map((info) => info.modification)
        .filter((mod) => {
            switch (target) {
                case PartyTarget.contract:
                    return getOr(
                        mod,
                        'party_modification.contract_modification.modification.creation',
                        false
                    );
                case PartyTarget.contractor:
                    return getOr(
                        mod,
                        'party_modification.contractor_modification.modification.creation',
                        false
                    );
                case PartyTarget.shop:
                    return getOr(
                        mod,
                        'party_modification.shop_modification.modification.creation',
                        false
                    );
            }
        })
        .map((info) => {
            const { id, modification } = info.party_modification;
            return {
                id,
                data: modification,
                unsaved: true,
            };
        });
