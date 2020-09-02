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
import { CommentTimelineItemService } from './comment-timeline-item.service';

@Component({
    selector: 'cc-comment-timeline-item',
    templateUrl: 'comment-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CommentTimelineItemService],
})
export class CommentTimelineItemComponent implements OnInit {
    @Input()
    changesetInfo: ChangesetInfo;

    @Input()
    menuConfig: MenuConfigItem[];

    @Output()
    menuItemSelected: EventEmitter<MenuConfigItem> = new EventEmitter();

    isLoading$ = this.commentTimelineItemService.isLoading$;
    message$ = this.commentTimelineItemService.message$;
    error$ = this.commentTimelineItemService.error$;

    constructor(private commentTimelineItemService: CommentTimelineItemService) {}

    ngOnInit(): void {
        this.commentTimelineItemService.getMessage([
            this.changesetInfo.modification.claim_modification.comment_modification.id,
        ]);
    }

    action(item: MenuConfigItem) {
        this.menuItemSelected.emit(item);
    }
}
