import { ModificationUnit } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { ChangesetInfo, ChangesetInfoType } from './changeset-info';

const makeStatusChangesetInfo = (unit: ModificationUnit): ChangesetInfo =>
    ({
        createdAt: unit.created_at,
        modification: unit.modification,
        userInfo: unit.user_info,
        type: ChangesetInfoType.statusModification,
        hash: ChangesetInfoType.statusModification,
    } as ChangesetInfo);

export const toStatusModificationChangesetInfo = (
    infos: ChangesetInfo[],
    unit: ModificationUnit
): ChangesetInfo[] => [...infos, makeStatusChangesetInfo(unit)];
