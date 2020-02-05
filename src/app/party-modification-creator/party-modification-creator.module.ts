import { NgModule } from '@angular/core';

import { UnitActionsNavListModule } from './unit-actions-nav-list';
import { PartyModificationEmitter } from './party-modification-emitter.service';
import { CreateModificationDialogModule } from './create-modification-dialog';

@NgModule({
    imports: [UnitActionsNavListModule, CreateModificationDialogModule],
    providers: [PartyModificationEmitter]
})
export class PartyModificationCreatorModule {}
