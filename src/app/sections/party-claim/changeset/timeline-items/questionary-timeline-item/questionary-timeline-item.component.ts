import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PartyID } from '../../../../../thrift-services/damsel/gen-model/domain';
import { ChangesetInfo } from '../../changeset-infos';
import { MenuConfigAction, MenuConfigItem } from '../menu-config';
import { TimelimeItemComponent } from '../timelime-item.component';
import { QuestionaryTimelineItemService } from './questionary-timeline-item.service';

@Component({
    selector: 'cc-questionary-timeline-item',
    templateUrl: 'questionary-timeline-item.component.html',
    providers: [QuestionaryTimelineItemService],
})
export class QuestionaryTimelineItemComponent extends TimelimeItemComponent implements OnInit {
    @Input()
    changesetInfo: ChangesetInfo;

    @Input()
    partyID: PartyID;

    isLoading$ = this.questionaryTimelineItemService.isLoading$;
    error$ = this.questionaryTimelineItemService.error$;
    questionaryData$ = this.questionaryTimelineItemService.questionaryData$;

    private extractPartyMod$ = new Subject<MenuConfigItem>();

    constructor(private questionaryTimelineItemService: QuestionaryTimelineItemService) {
        super();
    }

    ngOnInit() {
        this.questionaryTimelineItemService.getQuestionaryData(
            this.changesetInfo.modification.claim_modification.document_modification.id,
            this.partyID
        );

        this.extractPartyMod$
            .pipe(switchMap((item) => combineLatest([of(item), this.questionaryData$])))
            .subscribe(([item, questionary]) => {
                this.menuItemSelected.emit({ ...item, data: questionary });
            });
    }

    action(item: MenuConfigItem) {
        switch (item.action) {
            case MenuConfigAction.extractPartyModifications:
                this.extractPartyMod$.next(item);
                break;
        }
    }
}
