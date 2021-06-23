import cloneDeep from 'lodash-es/cloneDeep';

import { PartyModification } from '@cc/app/api/damsel/gen-model/claim_management';
import { CountryCode } from '@cc/app/api/damsel/gen-model/domain';

export const prepareModificationToEdit = (modification: PartyModification): PartyModification => {
    const prepared = cloneDeep(modification);
    const countryObject =
        prepared?.contractor_modification?.modification?.creation?.legal_entity
            ?.international_legal_entity?.country;
    if (countryObject && typeof countryObject === 'object') {
        prepared.contractor_modification.modification.creation.legal_entity.international_legal_entity.country = CountryCode[
            countryObject.id
        ] as any;
    }
    return prepared;
};
