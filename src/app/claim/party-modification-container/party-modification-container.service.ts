import { Injectable } from '@angular/core';

import { ActionType } from '../modification-action';
import { ContractModificationName, ModificationGroupType, ShopModificationName } from '../model';
import {
    ContractModificationUnit,
    ShopModificationUnit
} from '../../gen-damsel/payment_processing';

@Injectable()
export class PartyModificationContainerService {
    getDialogConfig(
        modification: ShopModificationUnit | ContractModificationUnit,
        name: ContractModificationName | ShopModificationName,
        type: string
    ) {
        const actionType = this.getActionType(type);
        const unitID = modification.id;
        return {
            data: {
                action: {
                    type: actionType,
                    name
                },
                unitID,
                modification
            },
            width: '800px',
            disableClose: true
        };
    }

    private getActionType(type): ActionType {
        switch (type) {
            case ModificationGroupType.ContractUnitContainer:
                return ActionType.contractAction;
            case ModificationGroupType.ShopUnitContainer:
                return ActionType.shopAction;
        }
    }
}
