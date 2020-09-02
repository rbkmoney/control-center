import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

import { ChangesetInfo } from '../../changeset-infos';
import { MenuConfigItem } from '../menu-config';
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
    menuConfig: MenuConfigItem[];

    @Output()
    menuItemSelected: EventEmitter<MenuConfigItem> = new EventEmitter();

    isLoading$ = this.fileTimelineItemService.isLoading$;
    error$ = this.fileTimelineItemService.error$;
    fileData$ = this.fileTimelineItemService.fileData$;

    constructor(private fileTimelineItemService: FileTimelineItemService) {}

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

    action(item: MenuConfigItem) {
        this.menuItemSelected.emit(item);
    }
}
