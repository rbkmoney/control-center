import merge from 'lodash-es/merge';

import { PartyModification } from '@cc/app/api/damsel/gen-model/claim_management';
import { CountryCode } from '@cc/app/api/damsel/gen-model/domain';

export const prepareModificationToEdit = (modification: PartyModification): PartyModification => {
    const prepared = Object.assign({}, modification);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const countryObject =
        modification?.contractor_modification?.modification?.creation?.legal_entity
            ?.international_legal_entity?.country;
    if (countryObject && typeof countryObject === 'object') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
        const country = CountryCode[countryObject.id];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const preparedCountry = {
            contractor_modification: {
                modification: {
                    creation: { legal_entity: { international_legal_entity: { country } } },
                },
            },
        };
        merge(prepared, preparedCountry);
    }
    return prepared;
};
