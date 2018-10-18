import { PartyModification } from '../damsel/payment-processing';

export const getModificationName = (modification: PartyModification): string => {
    const modificationKeys = Object.keys(modification);
    if (modificationKeys.length !== 1) {
        return 'unknown';
    }
    const modificationUnit = modification[modificationKeys[0]];
    const modificationNames = Object.keys(modificationUnit.modification);
    if (modificationNames.length !== 1) {
        return 'unknown';
    }
    return Object.keys(modificationUnit.modification)[0];
};
