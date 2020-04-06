import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';
import { ThriftService } from '../thrift-service';
import {
    Conversation,
    ConversationFilter,
    ConversationId,
    GetConversationResponse,
    User
} from './gen-model/messages';
import * as MessageServiceClient from './gen-nodejs/MessageService';
import {
    Conversation as ConversationType,
    ConversationFilter as ConversationFilterType,
    User as UserType
} from './gen-nodejs/messages_types';

@Injectable()
export class MessagesService extends ThriftService {
    constructor(zone: NgZone, keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(zone, keycloakTokenInfoService, '/v1/messages', MessageServiceClient);
    }

    getConversations = (
        ids: ConversationId[],
        filter: ConversationFilter
    ): Observable<GetConversationResponse> =>
        this.toObservableAction('GetConversations')(ids, new ConversationFilterType(filter));

    saveConversations = (conversations: Conversation[], user: User): Observable<void> =>
        this.toObservableAction('SaveConversations')(
            conversations.map(c => new ConversationType(c)),
            new UserType(user)
        );
}
