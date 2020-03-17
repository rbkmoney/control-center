import { Claim } from '../../../thrift-services/damsel/gen-model/claim_management';

export const getClaimSource = (claim: Claim): string =>
    claim.changeset[0].user_info.type.external_user ? 'Dashboard' : 'Control Center';
