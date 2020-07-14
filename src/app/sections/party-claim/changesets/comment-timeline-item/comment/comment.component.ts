import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'cc-comment',
    templateUrl: 'comment.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {}
