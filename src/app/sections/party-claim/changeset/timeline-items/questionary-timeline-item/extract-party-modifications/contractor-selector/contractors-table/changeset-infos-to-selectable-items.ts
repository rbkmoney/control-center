import { ChangesetInfo } from '../../../../../changeset-infos';
import { SelectableItem } from '../selectable-item';

export const changesetInfosToSelectableItems = (infos: ChangesetInfo[]): SelectableItem[] =>
    infos
        .map((info) => info.modification)
        .filter((info) => info.party_modification?.contractor_modification?.modification?.creation)
        .map((info) => {
            const { id, modification } = info.party_modification.contractor_modification;
            return {
                id,
                data: modification.creation,
                unsaved: true,
            };
        });
