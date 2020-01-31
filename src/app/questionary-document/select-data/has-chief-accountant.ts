import { YesNo, toYesNo } from './yes-no';
import { AccountantInfo } from '../../thrift-services/ank/gen-model/questionary';
import { get } from 'lodash-es';

export function hasChiefAccountant(accountantInfo: AccountantInfo): YesNo {
    return toYesNo(!!get(accountantInfo, 'with_chief_accountant', false));
}
