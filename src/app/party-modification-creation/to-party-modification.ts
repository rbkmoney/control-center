import { CreatableModificationName } from './creatable-modification-name';

const toContractModification = (unitID: string, modification: any) => (
    {
        contractModification: {
            id: unitID,
            modification: {
                payoutToolModification: modification
            }
        }
    }
);

export const toPartyModification = (name: CreatableModificationName, formValue: any) => {
    const {unitID, modification} = formValue;
    switch (name) {
        case CreatableModificationName.ContractPayoutToolModification:
            return toContractModification(unitID, modification);
    }
};
