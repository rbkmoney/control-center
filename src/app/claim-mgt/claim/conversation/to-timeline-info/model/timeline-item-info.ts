import { TimelineAction } from './timeline-action';
import {
    Modification,
    UserInfo
} from '../../../../../thrift-services/damsel/gen-model/claim_management';

export interface TimelineItemInfo {
    action: TimelineAction;
    user_info: UserInfo;
    created_at: string;
    modifications: Modification[];
    canEnrich: boolean;
    isLoaded?: boolean;
    data?: any;
}
