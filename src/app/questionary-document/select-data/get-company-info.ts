import get from 'lodash-es/get';

import { Questionary } from '../../thrift-services/ank/gen-model/questionary_manager';
import { getUnionValue } from '../../shared/utils';

export function getCompanyInfo(
    questionary: Questionary
): { companyName: string; companyInn: string } {
    return {
        companyName: get(questionary, ['data', 'shop_info', 'details', 'name'], ''),
        companyInn: getUnionValue(getUnionValue(questionary.data.contractor)).inn
    };
}
