import { getOr } from '../../../../../shared/utils';
import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { InternationalLegalEntity } from '../../../../../thrift-services/damsel/gen-model/domain';

const path = 'contractor.legal_entity.international_legal_entity';

export const toInternationalLegalEntity = (d: QuestionaryData): InternationalLegalEntity => ({
    legal_name: d.contractor.legal_entity.international_legal_entity.legal_name,
    trading_name: getOr(d, `${path}.trading_name`, ''),
    registered_address: getOr(d, `${path}.registered_address`, ''),
    actual_address: getOr(d, `${path}.actual_address`, ''),
    registered_number: getOr(d, `${path}.registered_number`, ''),
});
