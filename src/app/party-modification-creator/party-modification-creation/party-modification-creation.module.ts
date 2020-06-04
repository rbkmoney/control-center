import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { ModificationsModule } from '../../shared/components/modifications';
import { PartyModificationCreationComponent } from './party-modification-creation.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatInputModule,
        ModificationsModule,
    ],
    declarations: [PartyModificationCreationComponent],
    exports: [PartyModificationCreationComponent],
})
export class PartyModificationCreationModule {}
