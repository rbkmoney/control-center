import cloneDeep from 'lodash-es/cloneDeep';

import { PartyModification } from '@cc/app/api/damsel/gen-model/claim_management';
import { CountryCode } from '@cc/app/api/damsel/gen-model/domain';

export const prepareModificationsToBackend = (
    modification: PartyModification
): PartyModification => {
    const prepared = cloneDeep(modification);
    const countryCode =
        prepared?.contractor_modification?.modification?.creation?.legal_entity
            ?.international_legal_entity?.country;
    if (countryCode && typeof countryCode === 'string') {
        prepared.contractor_modification.modification.creation.legal_entity.international_legal_entity.country = {
            id: CountryCode[countryCode] as any,
        };
    }
    return prepared;
};
