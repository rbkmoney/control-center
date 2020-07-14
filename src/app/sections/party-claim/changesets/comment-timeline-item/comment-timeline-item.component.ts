import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'cc-comment-timeline-item',
    templateUrl: 'comment-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentTimelineItemComponent {}
