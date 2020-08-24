import { Pipe, PipeTransform } from '@angular/core';

import { ChangesetInfoModificationType } from '../changeset-infos';

@Pipe({
    name: 'ccCommentHeader',
})
export class CommentHeaderPipe implements PipeTransform {
    transform(type: ChangesetInfoModificationType): string {
        return ({
            [ChangesetInfoModificationType.creation]: 'added message',
            [ChangesetInfoModificationType.deletion]: 'removed message',
        } as const)[type];
    }
}
