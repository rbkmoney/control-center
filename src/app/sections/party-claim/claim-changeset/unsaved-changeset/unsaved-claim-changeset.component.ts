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

    unsavedChangesetInfos$ = this.unsavedClaimChangesetService.unsavedChangesetInfos$;

    changesetInfoTypes = ChangesetInfoType;

    constructor(private unsavedClaimChangesetService: UnsavedClaimChangesetService) {}

    ngOnInit(): void {
        this.unsavedClaimChangesetService.changesetUpdated$.subscribe(() => {
            this.changesetUpdated.emit();
        });
    }

    addModification() {
        this.unsavedClaimChangesetService.addModification(this.changeset[0].modification);
    }

    simpleTrackBy(index: number): number {
        return index;
    }

    save() {
        this.unsavedClaimChangesetService.save(this.partyID, this.claimID);
    }
}
