import { Conversation } from '../../../../thrift-services/messages/gen-model/messages';
import { TimelineAction, TimelineItemInfo } from './model';

export const addCommentsToTimelineInfos = (
    c: Conversation[],
    i: TimelineItemInfo[]
): TimelineItemInfo[] =>
    i.map(info => {
        if (info.action === TimelineAction.commentAdded) {
            return {
                ...info,
                data: c
                    ? c.find(c => {
                          return !!info.modifications.find(
                              m =>
                                  m.claim_modification.comment_modification.id === c.conversation_id
                          );
                      })
                    : null
            };
        } else {
            return info;
        }
    });
