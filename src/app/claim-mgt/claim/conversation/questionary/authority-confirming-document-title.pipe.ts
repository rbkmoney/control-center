import { Pipe, PipeTransform } from '@angular/core';

import { AuthorityConfirmingDocumentType } from '../../../../model/questionary';

const authorityConfirmingDocumentTitleByType: { [N in AuthorityConfirmingDocumentType]: string } = {
    meetingOfParticipants: 'Протокол общего собрания акционеров',
    meetingOfShareholders: 'Протокол общего собрания участников',
    solePartyDecision: 'Решение единственного участника',
};

@Pipe({
    name: 'authorityConfirmingDocumentTitle',
})
export class AuthorityConfirmingDocumentTitlePipe implements PipeTransform {
    transform(type: AuthorityConfirmingDocumentType | string): string {
        return authorityConfirmingDocumentTitleByType[type] || type;
    }
}
