import { getUnionKey, getUnionKeys } from '../../../../../shared/utils';
import { ModificationUnit } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { ChangesetInfo, ChangesetInfoType } from './changeset-info';
import { markOutdated } from './mark-outdated';

const getPartyChangesetInfoHash = (
    data: any,
    nesting: number = 1,
    hash?: string,
    level: number = 0
): string => {
    if (typeof data === 'string' || nesting === level) {
        return `${hash}.${String(getUnionKey(data))}`;
    }
    return getPartyChangesetInfoHash(
        getUnionKeys(data)
            .map((k) => data[k])
            .find((i) => typeof i !== 'string' && i !== null),
        nesting,
        hash ? `${hash}.${String(getUnionKey(data))}` : `${String(getUnionKey(data))}`,
        ++level
    );
};

const makePartyChangesetInfo = (unit: ModificationUnit): ChangesetInfo =>
    ({
        createdAt: unit.created_at,
        modification: unit.modification,
        userInfo: unit.user_info,
        type: ChangesetInfoType.partyModification,
        hash: getPartyChangesetInfoHash(unit.modification, 3),
    } as ChangesetInfo);

export const toPartyModificationChangesetInfo = (
    infos: ChangesetInfo[],
    unit: ModificationUnit
): ChangesetInfo[] => {
    const partyChangesetInfo = makePartyChangesetInfo(unit);
    return [...markOutdated(infos, partyChangesetInfo.hash), partyChangesetInfo];
};
