import groupBy from 'lodash-es/groupBy';
import map from 'lodash-es/map';

import { UnitName } from '../party-modification-creator/party-modification-creation/unit-name';
import {
    ContractModificationUnit,
    ShopModificationUnit
} from '../thrift-services/damsel/gen-model/payment_processing';
import {
    ModificationGroup,
    ModificationGroupType,
    PartyModificationUnit,
    PersistentContainer
} from './model';

interface PersistentUnit {
    modificationUnit: ShopModificationUnit | ContractModificationUnit;
    saved: boolean;
    typeHash: string;
}

const toContainers = (persistentUnits: PersistentUnit[]): any[] => {
    const grouped = groupBy(persistentUnits, item => {
        const modificationNames = Object.keys(item.modificationUnit.modification);
        if (modificationNames.length !== 1) {
            return 'unknown';
        }
        return modificationNames[0];
    });
    return map(grouped, (units, name) => ({
        name,
        unitContainers: units.map(({ modificationUnit, saved, typeHash }) => ({
            modificationUnit,
            saved,
            typeHash
        }))
    }));
};

const isHasUnsaved = (units: PersistentUnit[], unitID: string): boolean =>
    units.filter(i => !i.saved && i.modificationUnit.id === unitID).length > 0;

const toUnits = (persistentUnits: PersistentUnit[]): PartyModificationUnit[] => {
    const grouped = groupBy(persistentUnits, item => item.modificationUnit.id);
    return map(grouped, (units, unitID) => ({
        unitID,
        hasUnsaved: isHasUnsaved(units, unitID),
        containers: toContainers(units)
    }));
};

const toGroup = (
    name: UnitName,
    type: ModificationGroupType,
    containers: PersistentContainer[]
): ModificationGroup => {
    const persistent = containers.map(({ modification, saved, typeHash }) => ({
        modificationUnit: modification[name],
        typeHash,
        saved
    }));
    return {
        type,
        units: toUnits(persistent)
    };
};

export const convert = (containers: PersistentContainer[]): ModificationGroup[] => {
    const grouped = groupBy(containers, item => {
        const { shop_modification, contract_modification } = item.modification;
        if (shop_modification) {
            return ModificationGroupType.ShopUnitContainer;
        }
        if (contract_modification) {
            return ModificationGroupType.ContractUnitContainer;
        }
        return ModificationGroupType.unknown;
    });
    return map(grouped, (persistentContainer, type) => {
        switch (type) {
            case ModificationGroupType.ShopUnitContainer:
                return toGroup(UnitName.shopModification, type, persistentContainer);
            case ModificationGroupType.ContractUnitContainer:
                return toGroup(UnitName.contractModification, type, persistentContainer);
            case ModificationGroupType.unknown:
                return { type: ModificationGroupType.unknown };
        }
    });
};
