import { Component, Input, OnInit } from '@angular/core';

import { PartyID } from '../../../../../thrift-services/damsel/gen-model/domain';
import { ChangesetInfo } from '../../changeset-infos';
import { QuestionaryTimelineItemService } from './questionary-timeline-item.service';

@Component({
    selector: 'cc-questionary-timeline-item',
    templateUrl: 'questionary-timeline-item.component.html',
    providers: [QuestionaryTimelineItemService],
})
export class QuestionaryTimelineItemComponent implements OnInit {
    @Input()
    changesetInfo: ChangesetInfo;

    @Input()
    partyID: PartyID;

    isLoading$ = this.questionaryTimelineItemService.isLoading$;
    error$ = this.questionaryTimelineItemService.error$;
    questionaryData$ = this.questionaryTimelineItemService.questionaryData$;

    constructor(private questionaryTimelineItemService: QuestionaryTimelineItemService) {}

    ngOnInit() {
        this.questionaryTimelineItemService.getQuestionaryData(
            this.changesetInfo.modification.claim_modification.document_modification.id,
            this.partyID
        );
    }
}
