import { NgModule } from '@angular/core';

import { CreateModificationDialogModule } from './create-modification-dialog';
import { PartyModificationCreatorDialogService } from './party-modification-creator-dialog.service';
import { PartyModificationEmitter } from './party-modification-emitter.service';
import { UnitActionsNavListModule } from './unit-actions-nav-list';

@NgModule({
    imports: [UnitActionsNavListModule, CreateModificationDialogModule],
    providers: [PartyModificationEmitter, PartyModificationCreatorDialogService],
})
export class PartyModificationCreatorModule {}
