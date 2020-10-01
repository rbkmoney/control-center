import { toOptional } from '@cc/utils/index';

import { AuthorityConfirmingDocumentType } from '../../model/questionary';
import { AuthorityConfirmingDocument } from '../../thrift-services/ank/gen-model/questionary';
import { getDate } from '../select-data';

const mapAuthorityConfirmingDocumentType: { [name in AuthorityConfirmingDocumentType]: string } = {
    solePartyDecision: 'Решение единственного участника',
    meetingOfShareholders: 'Протокол общего собрания участников',
    meetingOfParticipants: 'Протокол общего собрания акционеров',
};

export function getAuthorityConfirmingDocument(
    authorityConfirmingDocument: AuthorityConfirmingDocument
): string {
    const { type, number: num, date } = toOptional(authorityConfirmingDocument);
    if (type || num || date) {
        const printedType = mapAuthorityConfirmingDocumentType[type] || type;
        const printedNumber = num ? `№${num}` : null;
        const printedDate = date ? `от ${getDate(date)}` : null;
        return [printedType, printedNumber, printedDate].filter((i) => i).join(' ');
    }
    return null;
}
