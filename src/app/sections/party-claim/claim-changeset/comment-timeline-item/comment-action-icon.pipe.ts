import { Pipe, PipeTransform } from '@angular/core';

import { ChangesetInfoModificationType } from '../changeset-infos';

@Pipe({
    name: 'ccCommentActionIcon',
})
export class CommentActionIconPipe implements PipeTransform {
    transform(type: ChangesetInfoModificationType): string {
        return ({
            [ChangesetInfoModificationType.creation]: 'add_comment',
            [ChangesetInfoModificationType.deletion]: 'clear',
        } as const)[type];
    }
}
