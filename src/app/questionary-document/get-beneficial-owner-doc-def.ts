import { DocDef } from './create-questionary';
import { getDocDef } from './beneficial-owner';
import { BeneficialOwner } from '../thrift-services/ank/gen-model/questionary';

export function getBeneficialOwnerDocDef(
    beneficialOwner: BeneficialOwner,
    companyName: string,
    companyInn: string
): DocDef {
    return getDocDef(beneficialOwner, companyName, companyInn);
}
