import { IdentityDocument } from '../../../../thrift-services/ank/gen-model/questionary';

export function getIdentityDocument(
    identityDocument: IdentityDocument
): { name?: string; seriesNumber?: string; issuer?: string; issuedAt?: string } | null {
    if (identityDocument && identityDocument.russian_domestic_password) {
        const {
            series_number,
            issuer,
            issued_at,
            issuer_code,
        } = identityDocument.russian_domestic_password;
        return {
            name: 'Паспорт РФ',
            seriesNumber: series_number,
            issuer: [issuer, issuer_code].filter((i) => !!i).join(', '),
            issuedAt: issued_at,
        };
    }
    console.error('Unknown identity document');
    return {};
}
