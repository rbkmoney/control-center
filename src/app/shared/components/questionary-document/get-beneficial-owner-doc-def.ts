import { BeneficialOwner } from '../../../thrift-services/ank/gen-model/questionary';
import { getDocDef } from './beneficial-owner';
import { DocDef } from './create-questionary';

export function getBeneficialOwnerDocDef(
    beneficialOwner: BeneficialOwner,
    companyName: string,
    companyInn: string
): DocDef {
    return getDocDef(beneficialOwner, companyName, companyInn);
}
