import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { WithdrawalsRoutingModule } from './withdrawals-routing.module';
import { WithdrawalsComponent } from './withdrawals.component';
import { CreateWithdrawalComponent } from './create-withdrawal/create-withdrawal.component';
import { CreateWithdrawalService } from './create-withdrawal/create-withdrawal.service';
import { WithdrawalsService } from '../wapi/withdrawals.service';

@NgModule({
    imports: [
        CommonModule,
        WithdrawalsRoutingModule,
        FlexLayoutModule,
        MatCardModule,
        SharedModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    declarations: [
        WithdrawalsComponent,
        CreateWithdrawalComponent
    ],
    providers: [
        CreateWithdrawalService,
        WithdrawalsService
    ]
})
export class WithdrawalsModule {}
