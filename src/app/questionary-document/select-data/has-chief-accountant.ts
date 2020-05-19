import get from 'lodash-es/get';

import { AccountantInfo } from '../../thrift-services/ank/gen-model/questionary';
import { toYesNo, YesNo } from './yes-no';

export function hasChiefAccountant(accountantInfo: AccountantInfo): YesNo {
    return toYesNo(!!get(accountantInfo, 'with_chief_accountant', false));
}
