import get from 'lodash-es/get';

import { Questionary } from '../../../../thrift-services/ank/gen-model/questionary_manager';

export function getCompanyInfo(
    questionary: Questionary
): { companyName: string; companyInn: string } {
    return {
        companyName: get(questionary, ['data', 'shop_info', 'details', 'name'], ''),
        companyInn:
            get(questionary, 'data.contractor.legal_entity.russian_legal_entity') ||
            get(questionary, 'data.contractor.individual_entity.russian_individual_entity') ||
            '',
    };
}
