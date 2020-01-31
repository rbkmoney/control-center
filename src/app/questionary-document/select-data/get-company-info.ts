import get from 'lodash-es/get';

import { Questionary } from '../../thrift-services/ank/gen-model/questionary_manager';

export function getCompanyInfo(
    questionary: Questionary
): { companyName: string; companyInn: string } {
    const companyName = get(questionary, ['data', 'shop_info', 'details', 'name'], '');
    if (get(questionary, ['data', 'contractor', 'individual_entity'])) {
        return {
            companyName,
            companyInn: questionary.data.contractor.individual_entity.russian_individual_entity.inn
        };
    } else if (get(questionary, ['data', 'contractor', 'legal_entity'])) {
        return {
            companyName,
            companyInn: questionary.data.contractor.legal_entity.russian_legal_entity.inn
        };
    }
    console.error('Unknown questionary');
    return null;
}
