import * as moment from 'moment';
import * as uuid from 'uuid/v4';

import { Conversation, ConversationStatus } from '../gen-model/messages';

export const createSingleMessageConversationParams = (
    conversation_id: string,
    text: string,
    user_id: string
): Conversation => ({
    conversation_id,
    messages: [{ message_id: uuid(), text, user_id, timestamp: moment().toISOString() }],
    status: ConversationStatus.ACTUAL,
});
