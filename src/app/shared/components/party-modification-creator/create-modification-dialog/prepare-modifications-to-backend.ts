import merge from 'lodash-es/merge';

import { CountryRef } from '@cc/app/api/damsel/domain-config/gen-nodejs/domain_types';
import { PartyModification } from '@cc/app/api/damsel/gen-model/claim_management';
import { CountryCode } from '@cc/app/api/damsel/gen-model/domain';

export const prepareModificationsToBackend = (
    modification: PartyModification
): PartyModification => {
    const prepared = Object.assign({}, modification);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const countryCode =
        modification?.contractor_modification?.modification?.creation?.legal_entity
            ?.international_legal_entity?.country;
    if (countryCode && typeof countryCode === 'string') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
        const country = new CountryRef({ id: CountryCode[countryCode] });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const preparedContractor = {
            contractor_modification: {
                modification: {
                    creation: { legal_entity: { international_legal_entity: { country } } },
                },
            },
        };
        merge(prepared, preparedContractor);
    }
    return prepared;
};
