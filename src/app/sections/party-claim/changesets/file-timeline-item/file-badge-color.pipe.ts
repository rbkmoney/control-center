import { Pipe, PipeTransform } from '@angular/core';

import { ChangesetInfoModificationType } from '../claim-changeset/changeset-infos';

@Pipe({
    name: 'ccFileBadgeColor',
})
export class FileBadgeColorPipe implements PipeTransform {
    transform(type: ChangesetInfoModificationType): 'primary' | 'warn' | 'error' | 'success' {
        return ({
            [ChangesetInfoModificationType.creation]: 'primary',
            [ChangesetInfoModificationType.deletion]: null,
        } as const)[type];
    }
}
