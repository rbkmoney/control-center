import { Pipe, PipeTransform } from '@angular/core';

import { ChangesetInfoModificationType } from '../claim-changeset/changeset-infos';

@Pipe({
    name: 'ccFileActionIcon',
})
export class FileActionIconPipe implements PipeTransform {
    transform(type: ChangesetInfoModificationType): string {
        return ({
            [ChangesetInfoModificationType.creation]: 'attach_file',
            [ChangesetInfoModificationType.deletion]: 'clear',
        } as const)[type];
    }
}
