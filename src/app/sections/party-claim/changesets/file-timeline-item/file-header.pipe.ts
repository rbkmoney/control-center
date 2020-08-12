import { Pipe, PipeTransform } from '@angular/core';

import { ChangesetInfoModificationType } from '../claim-changeset/changeset-infos';

@Pipe({
    name: 'ccFileHeader',
})
export class FileHeaderPipe implements PipeTransform {
    transform(type: ChangesetInfoModificationType): string {
        return ({
            [ChangesetInfoModificationType.creation]: 'added files',
            [ChangesetInfoModificationType.deletion]: 'removed files',
        } as const)[type];
    }
}
