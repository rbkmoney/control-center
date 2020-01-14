import { Component, Input, OnInit } from '@angular/core';

import { CommentService } from './comment.service';
import { CommentModificationUnit } from '../../../../thrift-services/damsel/gen-model/claim_management';

@Component({
    selector: 'cc-conversation-comment',
    templateUrl: 'comment.component.html',
    styleUrls: ['comment.component.scss'],
    providers: [CommentService]
})
export class CommentComponent implements OnInit {
    @Input() commentModification: CommentModificationUnit;

    comment$ = this.commentService.comment$;

    constructor(private commentService: CommentService) {}

    ngOnInit(): void {
        // this.commentService.getComment(this.commentModification.id);
    }
}
