import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

import { ClaimChangeset } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { PartyID } from '../../../../thrift-services/damsel/gen-model/domain';
import { ChangesetInfoType } from '../changeset-infos';
import { MenuConfigAction, MenuConfigItem } from '../timeline-items/menu-config';
import { UnsavedClaimChangesetService } from './unsaved-claim-changeset.service';

@Component({
    selector: 'cc-unsaved-claim-changeset',
    templateUrl: 'unsaved-claim-changeset.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnsavedClaimChangesetComponent implements OnInit {
    @Input()
    changeset: ClaimChangeset;

    @Input()
    partyID: PartyID;

    @Input()
    claimID: string;

    @Output()
    changesetUpdated = new EventEmitter();

    inProgress$ = this.unsavedClaimChangesetService.inProgress$;

    unsavedChangesetInfos$ = this.unsavedClaimChangesetService.unsavedChangesetInfos$;

    changesetInfoTypes = ChangesetInfoType;

    fileMenuConfig: MenuConfigItem[] = [
        { action: MenuConfigAction.removeUnsavedItem, label: 'Remove' },
    ];
    commentMenuConfig: MenuConfigItem[] = [
        { action: MenuConfigAction.removeUnsavedItem, label: 'Remove' },
    ];
    partyModMenuConfig: MenuConfigItem[] = [
        { action: MenuConfigAction.removeUnsavedItem, label: 'Remove' },
        { action: MenuConfigAction.editPartyModification, label: 'Edit' },
    ];
    questionaryMenuConfig: MenuConfigItem[] = [
        { action: MenuConfigAction.removeUnsavedItem, label: 'Remove' },
    ];

    constructor(private unsavedClaimChangesetService: UnsavedClaimChangesetService) {}

    ngOnInit(): void {
        this.unsavedClaimChangesetService.changesetUpdated$.subscribe(() => {
            this.changesetUpdated.emit();
        });
    }

    simpleTrackBy(index: number): number {
        return index;
    }

    save(): void {
        this.unsavedClaimChangesetService.save(this.partyID, this.claimID);
    }

    menuItemSelected($event: MenuConfigItem, i: number): void {
        switch ($event.action) {
            case MenuConfigAction.removeUnsavedItem:
                this.unsavedClaimChangesetService.remove(i);
                break;
            case MenuConfigAction.editPartyModification:
                this.unsavedClaimChangesetService.edit(i);
                break;
            default:
                console.warn('Action not implemented');
        }
    }
}
