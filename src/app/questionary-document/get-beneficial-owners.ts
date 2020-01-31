import { Questionary } from '../thrift-services/ank/gen-model/questionary_manager';
import { BeneficialOwner } from '../thrift-services/ank/gen-model/questionary';
import get from 'lodash-es/get';

export function getBeneficialOwners(questionary: Questionary): BeneficialOwner[] {
    if (get(questionary, ['data', 'contractor', 'individual_entity'])) {
        return questionary.data.contractor.individual_entity.russian_individual_entity
            .beneficial_owners;
    } else if (get(questionary, ['data', 'contractor', 'legal_entity'])) {
        return questionary.data.contractor.legal_entity.russian_legal_entity.beneficial_owners;
    }
    console.error('Unknown questionary');
    return [];
}
