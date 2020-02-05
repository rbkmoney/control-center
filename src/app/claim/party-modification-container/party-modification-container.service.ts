import { Injectable } from '@angular/core';

import { ActionType } from '../modification-action';
import { ModificationGroupType } from '../model';
import {
    ContractModificationUnit,
    ShopModificationUnit
} from '../../thrift-services/damsel/gen-model/payment_processing';
import { ContractModificationName, ShopModificationName } from '../../party-modification-creator';

@Injectable()
export class PartyModificationContainerService {
    getDialogConfig(
        modification: ShopModificationUnit | ContractModificationUnit,
        name: ContractModificationName | ShopModificationName,
        type: string,
        partyID: string
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
                partyID,
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
