import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ChangesetInfo } from '../../changeset-infos';
import { UnsavedClaimChangesetService } from '../../unsaved-changeset/unsaved-claim-changeset.service';
import { FileTimelineItemService } from './file-timeline-item.service';

@Component({
    selector: 'cc-file-timeline-item',
    templateUrl: 'file-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FileTimelineItemService],
})
export class FileTimelineItemComponent implements OnInit {
    @Input()
    changesetInfo: ChangesetInfo;

    @Input()
    index?: number;

    isLoading$ = this.fileTimelineItemService.isLoading$;
    error$ = this.fileTimelineItemService.error$;
    fileData$ = this.fileTimelineItemService.fileData$;

    constructor(
        private fileTimelineItemService: FileTimelineItemService,
        private unsavedClaimChangesetService: UnsavedClaimChangesetService
    ) {}

    ngOnInit() {
        this.fileTimelineItemService.getFileInfo(
            this.changesetInfo?.modification.claim_modification.file_modification.id
        );
    }

    downloadFile() {
        this.fileTimelineItemService.downloadFile(
            this.changesetInfo.modification.claim_modification.file_modification.id
        );
    }

    remove() {
        this.unsavedClaimChangesetService.remove(this.index);
    }
}
