import { ModificationUnit } from '../../../../thrift-services/damsel/gen-model/claim_management';

export class ModificationUnitInfo {
    isOutdated: boolean;
    path: string;
    unit: ModificationUnit;
}
