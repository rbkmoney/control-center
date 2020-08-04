import { ModificationUnit } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { ChangesetInfo } from './changeset-info';

const makeStatusChangesetInfo = (unit: ModificationUnit): ChangesetInfo => ({
    createdAt: unit.created_at,
    modification: unit.modification,
    userInfo: unit.user_info,
    type: 'statusModification',
    hash: 'statusModification',
});

export const toStatusModificationChangesetInfo = (
    unit: ModificationUnit,
    infos: ChangesetInfo[]
): ChangesetInfo[] => [...infos, makeStatusChangesetInfo(unit)];
