import { getUnionKey } from '../../../shared/utils';
import { ModificationUnit } from '../../../thrift-services/damsel/gen-model/claim_management';
import { ChangesetInfo, ChangesetInfoType } from './changeset-info';
import { markOutdated } from './mark-outdated';

const getHash = (m: any, acc: string = ''): string => {
    if (m.id && m.modification) {
        return `${acc}.${getUnionKey(m.modification) as string}`;
    }
    const unionKey = getUnionKey(m) as string;
    return getHash(m[unionKey], `${acc}.${unionKey}`);
};

const makePartyChangesetInfo = (unit: ModificationUnit): ChangesetInfo =>
    ({
        createdAt: unit.created_at,
        modification: unit.modification,
        userInfo: unit.user_info,
        type: ChangesetInfoType.partyModification,
        hash: getHash(unit.modification),
    } as ChangesetInfo);

export const toPartyModificationChangesetInfo = (
    infos: ChangesetInfo[],
    unit: ModificationUnit
): ChangesetInfo[] => {
    const partyChangesetInfo = makePartyChangesetInfo(unit);
    return [...markOutdated(infos, partyChangesetInfo.hash), partyChangesetInfo];
};
