import { Conversation } from '../../../../thrift-services/messages/gen-model/messages';
import { TimelineAction, TimelineItemInfo } from './model';

export const addCommentsToTimelineInfos = (
    conversations: Conversation[],
    infos: TimelineItemInfo[]
): TimelineItemInfo[] =>
    infos.map(info => {
        if (info.action === TimelineAction.commentAdded) {
            return {
                ...info,
                data: conversations
                    ? conversations.find(conversation => {
                          return !!info.modifications.find(
                              m =>
                                  m.claim_modification.comment_modification.id ===
                                  conversation.conversation_id
                          );
                      })
                    : null
            };
        } else {
            return info;
        }
    });
