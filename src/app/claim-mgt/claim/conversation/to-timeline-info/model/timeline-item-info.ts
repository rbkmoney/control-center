import { TimelineAction } from './timeline-action';
import { Modification, UserInfo } from '../../../../../gen-damsel/claim_management';

export interface TimelineItemInfo {
    action: TimelineAction;
    user_info: UserInfo;
    created_at: string;
    modifications: Modification[];
}
