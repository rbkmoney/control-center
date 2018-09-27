import { ContractorID } from '../domain';
import { ContractorModification } from './contractor-modification';

export class ContractorModificationUnit {
    id: ContractorID;
    modification: ContractorModification;
}
