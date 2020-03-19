import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, ConnectableObservable, of } from 'rxjs';

import { ConversationService } from './conversation.service';
import { switchMap, pluck, map, publishReplay } from 'rxjs/operators';
import { AnkService } from '../../../thrift-services/ank/ank.service';
import { TimelineAction } from './to-timeline-info/model';
import { Questionary } from '../../../thrift-services/ank/gen-model/questionary_manager';

@Injectable()
export class QuestionaryService {
    questionary$ = this.conversationService.timelineInfos$.pipe(
        map(timelineInfos => timelineInfos.find(i => i.action === TimelineAction.changesAdded)),
        pluck('modifications', 0, 'claim_modification', 'document_modification', 'id'),
        switchMap(id => combineLatest([of(id), this.route.params.pipe(pluck('party_id'))])),
        switchMap(([quest_id, party_id]) => this.ankService.get(quest_id, party_id)),
        pluck('questionary'),
        publishReplay(1)
    ) as ConnectableObservable<Questionary>;

    constructor(
        private conversationService: ConversationService,
        private ankService: AnkService,
        private route: ActivatedRoute
    ) {
        this.questionary$.connect();
    }
}
