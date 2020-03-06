import { NgModule } from '@angular/core';
import { PartySearchComponent } from './party-search.component';
import { PartySearchRouting } from './party-search-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PartyService } from '../../../papi/party.service';

@NgModule({
    imports: [
        PartySearchRouting,
        SharedModule,
        MatCardModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        CommonModule,
        FlexLayoutModule,
        MatInputModule,
        MatButtonModule
    ],
    declarations: [PartySearchComponent],
    providers: [PartyService]
})
export class PartySearchModule {}
