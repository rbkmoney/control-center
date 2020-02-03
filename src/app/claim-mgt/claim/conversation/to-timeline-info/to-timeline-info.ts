import {
    ClaimModification,
    Modification,
    ModificationUnit
} from '../../../../thrift-services/damsel/gen-model/claim_management';
import { TimelineAction, TimelineItemInfo } from './model';
import { sortUnitsByCreatedAtAsc } from '../../../../shared/utils';
import { getUnionKey } from '../../../../shared/get-union-key';
import { getClaimModificationTimelineAction } from './get-claim-modification-timeline-action';

const isSame = (x: TimelineItemInfo, y: TimelineItemInfo): boolean =>
    x.action === y.action && x.user_info.type === y.user_info.type;

const getUnitTimelineAction = (modification: Modification): TimelineAction | null => {
    switch (getUnionKey(modification)) {
        case 'claim_modification':
            return getClaimModificationTimelineAction(
                modification.claim_modification as ClaimModification
            );
        case 'party_modification':
            return TimelineAction.partyModification;
    }
};

const concatLastItem = (
    acc: TimelineItemInfo[],
    updateItem: TimelineItemInfo
): TimelineItemInfo[] =>
    acc.map((accItem, accItemIndex) =>
        accItemIndex === acc.length - 1
            ? {
                  ...updateItem,
                  modifications: accItem.modifications.concat(updateItem.modifications)
              }
            : accItem
    );

const acceptTimelineItem = (
    acc: TimelineItemInfo[],
    { created_at, modification, user_info }: ModificationUnit
): TimelineItemInfo[] => {
    const action = getUnitTimelineAction(modification);
    if (action === null) {
        return acc;
    }
    const modifications = [modification];
    const result = {
        action,
        user_info,
        created_at: created_at as string,
        modifications
    };
    if (acc.length !== 0 && modifications.length !== 0) {
        const lastItem = acc[acc.length - 1];
        if (isSame(result, lastItem)) {
            return concatLastItem(acc, result);
        }
    }
    return acc.concat(result);
};

export const toTimelineInfo = (units: ModificationUnit[]): TimelineItemInfo[] => {
    if (!units || units.length === 0) {
        return [];
    }
    const sortedUnits = sortUnitsByCreatedAtAsc(units);
    return sortedUnits.reduce(acceptTimelineItem, []);
};
