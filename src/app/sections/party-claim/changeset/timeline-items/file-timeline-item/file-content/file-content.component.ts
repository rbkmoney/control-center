import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { FileID } from '../../../../../../thrift-services/damsel/gen-model/claim_management';
import { FileData } from '../../../../../../thrift-services/file-storage/gen-model/file_storage';
import { FileTimelineItemService } from '../file-timeline-item.service';

@Component({
    selector: 'cc-file-content',
    templateUrl: 'file-content.component.html',
    styleUrls: ['file-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileContentComponent {
    @Input()
    fileData: FileData;

    constructor(private fileTimelineItemService: FileTimelineItemService) {}

    downloadFile(fileID: FileID) {
        this.fileTimelineItemService.downloadFile(fileID);
    }
}
