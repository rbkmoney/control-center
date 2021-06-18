import cloneDeep from 'lodash-es/cloneDeep';

import { PartyModification } from '@cc/app/api/damsel/gen-model/claim_management';
import { CountryCode } from '@cc/app/api/damsel/gen-model/domain';

export const prepareModificationToEdit = (modification: PartyModification): PartyModification => {
    const prepared = cloneDeep(modification);
    const countryObject =
        prepared?.contractor_modification?.modification?.creation?.legal_entity
            ?.international_legal_entity?.country;
    if (countryObject && typeof countryObject === 'object') {
        const country = CountryCode[countryObject.id];
        prepared.contractor_modification.modification.creation.legal_entity.international_legal_entity.country = country as any;
    }
    return prepared;
};
