import { Questionary } from '../thrift-services/ank/gen-model/questionary_manager';
import { BeneficialOwner } from '../thrift-services/ank/gen-model/questionary';

export function getBeneficialOwners(questionary: Questionary): BeneficialOwner[] | null {
    if (questionary.data.contractor.individual_entity) {
        return questionary.data.contractor.individual_entity.russian_individual_entity
            .beneficial_owners;
    } else if (questionary.data.contractor.legal_entity) {
        return questionary.data.contractor.legal_entity.russian_legal_entity.beneficial_owners;
    } else {
        console.error('Unknown questionary');
        return null;
    }
}
