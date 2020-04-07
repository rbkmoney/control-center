import get from 'lodash-es/get';

import { getUnionKey, toOptional } from '../../shared/utils';
import {
    AdditionalInfo,
    WithoutChiefAccountant
} from '../../thrift-services/ank/gen-model/questionary';
import { hasChiefAccountant } from './has-chief-accountant';
import { YesNo } from './yes-no';

export interface BusinessInfo {
    hasChiefAccountant: YesNo;
    staffCount: number;
    accounting: keyof WithoutChiefAccountant;
    accountingOrgInn?: string;
}

export function getBusinessInfo(additionalInfo: AdditionalInfo): BusinessInfo {
    const { accountant_info, staff_count } = toOptional(additionalInfo);
    return {
        hasChiefAccountant: hasChiefAccountant(accountant_info),
        staffCount: staff_count,
        accounting: getUnionKey(toOptional(accountant_info).without_chief_accountant),
        accountingOrgInn: get(
            accountant_info,
            ['without_chief_accountant', 'accounting_organization', 'inn'],
            null
        )
    };
}
