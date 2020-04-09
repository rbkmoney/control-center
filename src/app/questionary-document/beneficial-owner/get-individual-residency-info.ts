import { ResidencyInfo } from '../../thrift-services/ank/gen-model/questionary';

export function getIndividualResidencyInfo(
    residencyInfo: ResidencyInfo
): {
    usaTaxResident: boolean;
    exceptUsaTaxResident: boolean;
} {
    if (residencyInfo.individual_residency_info) {
        const {
            usa_tax_resident: usaTaxResident,
            except_usa_tax_resident: exceptUsaTaxResident,
        } = residencyInfo.individual_residency_info;
        return {
            usaTaxResident,
            exceptUsaTaxResident,
        };
    }
    console.error("ResidencyInfo isn't IndividualResidencyInfo");
    return null;
}
