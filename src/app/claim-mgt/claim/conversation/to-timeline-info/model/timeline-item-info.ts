import {
    Modification,
    UserInfo,
} from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { Conversation } from '../../../../../thrift-services/messages/gen-model/messages';
import { TimelineAction } from './timeline-action';

export interface TimelineItemInfo {
    action: TimelineAction;
    user_info: UserInfo;
    created_at: string;
    modifications: Modification[];
    data?: Conversation;
}
