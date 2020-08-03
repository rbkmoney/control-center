import { getUnionKey, getUnionValue } from '../../../../shared/utils';
import { ModificationUnit } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { ModificationUnitInfo } from './modification-unit-info';

const getModificationPath = (unit: ModificationUnit): string => {
    const unitType = getUnionKey(unit.modification);
    const unitValue = getUnionValue(unit.modification);
    const unitValueType = getUnionKey(unitValue);
    const unitValueValue = getUnionValue(unitValue);
    const unitValueValueType = getUnionKey(unitValueValue.modification);
    return `${unitType}.${unitValueType}.modification.${unitValueValueType}`;
};

export const toModificationUnitInfos = (units: ModificationUnit[]): ModificationUnitInfo[] => {
    const infos = [];
    units.forEach((unit) => {
        const path = getModificationPath(unit);
        infos.push({
            isOutdated: !!infos.find((info, i) => {
                if (info.path === path) {
                    infos[i].isOutdated = true;
                }
                return false;
            }),
            path,
            unit,
        });
    });
    return infos;
};
