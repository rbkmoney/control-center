import { Pipe, PipeTransform } from '@angular/core';

import { ChangesetInfoModificationType } from '../claim-changeset/changeset-infos';

@Pipe({
    name: 'ccCommentBadgeColor',
})
export class CommentBadgeColorPipe implements PipeTransform {
    transform(
        type: ChangesetInfoModificationType,
        removed?: boolean
    ): 'primary' | 'warn' | 'error' | 'success' {
        return ({
            [ChangesetInfoModificationType.creation]: !removed ? 'primary' : null,
            [ChangesetInfoModificationType.deletion]: null,
        } as const)[type];
    }
}
