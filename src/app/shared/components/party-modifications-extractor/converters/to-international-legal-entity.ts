import { getOr } from '@cc/utils/get-or';

import { QuestionaryData } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { InternationalLegalEntity } from '../../../../thrift-services/damsel/gen-model/domain';

const PATH = 'contractor.legal_entity.international_legal_entity';

export const toInternationalLegalEntity = (d: QuestionaryData): InternationalLegalEntity => ({
    legal_name: d.contractor.legal_entity.international_legal_entity.legal_name,
    trading_name: getOr(d, `${PATH}.trading_name`, ''),
    registered_address: getOr(d, `${PATH}.registered_address`, ''),
    actual_address: getOr(d, `${PATH}.actual_address`, ''),
    registered_number: getOr(d, `${PATH}.registered_number`, ''),
});
