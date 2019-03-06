import { PartyModificationUnit } from './party-modification-unit';
import { ClaimStatus } from './claim-statuses';

export class ClaimInfo {
    party_id: string;
    claim_id: number;
    status: ClaimStatus;
    assigned_user_id: string;
    description: string;
    reason: string;
    modifications: PartyModificationUnit;
    modification_unit: any;
    revision: string;
    created_at: string;
    updated_at: string;
}
