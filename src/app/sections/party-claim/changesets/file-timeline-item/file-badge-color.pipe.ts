import { Pipe, PipeTransform } from '@angular/core';

import { ChangesetInfoModificationType } from '../claim-changeset/changeset-infos';

@Pipe({
    name: 'ccFileBadgeColor',
})
export class FileBadgeColorPipe implements PipeTransform {
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
