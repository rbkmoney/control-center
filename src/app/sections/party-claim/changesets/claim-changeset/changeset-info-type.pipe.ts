import { Pipe, PipeTransform } from '@angular/core';

import { ChangesetInfoType } from '../claim-changeset/changeset-infos';

@Pipe({
    name: 'ccChangesetInfoType',
})
export class ChangesetInfoTypePipe implements PipeTransform {
    transform(type: ChangesetInfoType): string {
        return ({
            [ChangesetInfoType.statusModification]: 'Status changes',
            [ChangesetInfoType.documentModification]: 'Show documents',
            [ChangesetInfoType.partyModification]: 'Show party mods',
            [ChangesetInfoType.commentModification]: 'Show comments',
            [ChangesetInfoType.fileModification]: 'Show files',
        } as const)[type];
    }
}
