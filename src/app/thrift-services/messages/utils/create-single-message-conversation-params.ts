import * as moment from 'moment';
import * as uuid from 'uuid/v4';

import { Conversation, ConversationStatus } from '../gen-model/messages';

export const createSingleMessageConversationParams = (
    conversationId: string,
    text: string,
    userId: string
): Conversation => ({
    conversation_id: conversationId,
    messages: [{ message_id: uuid(), text, user_id: userId, timestamp: moment().toISOString() }],
    status: ConversationStatus.ACTUAL,
});
