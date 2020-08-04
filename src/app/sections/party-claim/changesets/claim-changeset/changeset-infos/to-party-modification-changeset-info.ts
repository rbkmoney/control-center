import { getUnionKey, getUnionValue } from '../../../../../shared/utils';
import { ModificationUnit } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { ChangesetInfo } from './changeset-info';

const getPartyChangesetInfoHash = (unit: ModificationUnit): string => {
    const unitType = getUnionKey(unit.modification);
    const unitValue = getUnionValue(unit.modification);
    const unitValueType = getUnionKey(unitValue);
    const unitValueValue = getUnionValue(unitValue);
    const unitValueValueType = getUnionKey(unitValueValue.modification);
    return `${unitType}.${unitValueType}.${unitValueValueType}`;
};

const makePartyChangesetInfo = (unit: ModificationUnit): ChangesetInfo => ({
    createdAt: unit.created_at,
    modification: unit.modification,
    userInfo: unit.user_info,
    type: 'partyModification',
    hash: getPartyChangesetInfoHash(unit),
});

export const toPartyModificationChangesetInfo = (
    unit: ModificationUnit,
    infos: ChangesetInfo[]
): ChangesetInfo[] => {
    const partyChangesetInfo = makePartyChangesetInfo(unit);
    return [
        ...infos.map((info) =>
            info.hash === partyChangesetInfo.hash ? { ...info, outdated: true } : info
        ),
        partyChangesetInfo,
    ];
};
