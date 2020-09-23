import { NgModule } from '@angular/core';

import { CreateModificationDialogModule } from './create-modification-dialog';
import { PartyModificationEmitter } from './party-modification-emitter.service';
import { UnitActionsNavListModule } from './unit-actions-nav-list';

@NgModule({
    imports: [UnitActionsNavListModule, CreateModificationDialogModule],
    providers: [PartyModificationEmitter],
})
export class PartyModificationCreatorLegacyModule {}
