import { AuthorityConfirmingDocumentType } from '../../model/questionary';
import { toOptional } from '../../shared/utils';
import { AuthorityConfirmingDocument } from '../../thrift-services/ank/gen-model/questionary';
import { getDate } from '../select-data';

const mapAuthorityConfirmingDocumentType: { [name in AuthorityConfirmingDocumentType]: string } = {
    solePartyDecision: 'Решение единственного участника',
    meetingOfShareholders: 'Протокол общего собрания участников',
    meetingOfParticipants: 'Протокол общего собрания акционеров'
};

export function getAuthorityConfirmingDocument(
    authorityConfirmingDocument: AuthorityConfirmingDocument
): string {
    const { type, number, date } = toOptional(authorityConfirmingDocument);
    if (type || number || date) {
        const printedType = mapAuthorityConfirmingDocumentType[type] || type;
        const printedNumber = number ? `№${number}` : null;
        const printedDate = date ? `от ${getDate(date)}` : null;
        return [printedType, printedNumber, printedDate].filter((i) => i).join(' ');
    }
    return null;
}
