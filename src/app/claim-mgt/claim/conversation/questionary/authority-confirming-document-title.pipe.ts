import { Pipe, PipeTransform } from '@angular/core';
import { AuthorityConfirmingDocumentType } from '../../../../model/questionary';

const authorityConfirmingDocumentTitleByType: { [N in AuthorityConfirmingDocumentType]: string } = {
    meetingOfParticipants: 'Meeting of participants',
    meetingOfShareholders: 'Meeting of shareholders',
    solePartyDecision: 'Sole party decision'
};

@Pipe({
    name: 'authorityConfirmingDocumentTitle'
})
export class AuthorityConfirmingDocumentTitlePipe implements PipeTransform {
    transform(type: AuthorityConfirmingDocumentType | string): string {
        return authorityConfirmingDocumentTitleByType[type] || type;
    }
}
