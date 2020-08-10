import { ModificationUnit } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { ChangesetInfo, ChangesetInfoType } from './changeset-info';

const makeStatusChangesetInfo = (unit: ModificationUnit): ChangesetInfo =>
    ({
        createdAt: unit.created_at,
        modification: unit.modification,
        userInfo: unit.user_info,
        type: ChangesetInfoType.UNKNOWN,
        hash: ChangesetInfoType.UNKNOWN,
    } as ChangesetInfo);

export const toUnknownModificationChangesetInfo = (
    infos: ChangesetInfo[],
    unit: ModificationUnit
): ChangesetInfo[] => [...infos, makeStatusChangesetInfo(unit)];
