import { Component } from '@angular/core';
import { ActionType, UnitAction } from '../unit-action';
import { ContractModificationName, ShopModificationName, UnitContainerType } from '../model';
import { CreateChangeComponent, CreateChangeComponentInterface } from '../create-change/create-change.component';
import { MatBottomSheetRef, MatDialog } from '@angular/material';

@Component({
    templateUrl: 'create-unit.component.html'
})
export class CreateUnitComponent {
    actions: UnitAction[] = [
        {
            type: ActionType.shopAction,
            name: ShopModificationName.creation
        },
        {
            type: ActionType.contractAction,
            name: ContractModificationName.creation
        }
    ];

    constructor(private bottomSheetRef: MatBottomSheetRef,
                private dialog: MatDialog) {

    }

    select(action: UnitAction) {
        this.bottomSheetRef.dismiss();
        const config = {
            data: {action},
            width: '720px',
            disableClose: true
        };
        this.dialog.open<CreateChangeComponent, CreateChangeComponentInterface>(CreateChangeComponent, config);
    }

    getContainerType(name: ActionType): UnitContainerType {
        switch (name) {
            case ActionType.shopAction:
                return UnitContainerType.ShopUnitContainer;
            case ActionType.contractAction:
                return UnitContainerType.ContractUnitContainer;
        }
    }
}
