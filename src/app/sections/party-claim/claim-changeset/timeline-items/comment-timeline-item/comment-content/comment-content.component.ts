import { Component, Input } from '@angular/core';

@Component({
    selector: 'cc-comment-content',
    templateUrl: 'comment-content.component.html',
})
export class CommentContentComponent {
    @Input()
    text: string;
}
