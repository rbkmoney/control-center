import { Pipe, PipeTransform } from '@angular/core';

import { ChangesetInfoModificationType } from '../claim-changeset/changeset-infos';

@Pipe({
    name: 'ccCommentBadgeColor',
})
export class CommentBadgeColorPipe implements PipeTransform {
    transform(type: ChangesetInfoModificationType): 'primary' | 'warn' | 'error' | 'success' {
        return ({
            [ChangesetInfoModificationType.creation]: 'primary',
            [ChangesetInfoModificationType.deletion]: null,
        } as const)[type];
    }
}
