import { Modification } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { ChangesetInfo } from '../changeset-infos';

export const createDeleteFileModification = (info: ChangesetInfo): Modification => ({
    claim_modification: {
        file_modification: {
            id: info.modification.claim_modification.file_modification.id,
            modification: {
                deletion: {},
            },
        },
    },
});
