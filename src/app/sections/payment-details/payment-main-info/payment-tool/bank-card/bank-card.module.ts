import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { BankCardComponent } from './bank-card.component';
import { ToCardNumberPipe } from './to-card-number.pipe';
@NgModule({
    imports: [CommonModule, FlexLayoutModule, MatIconModule],
    declarations: [BankCardComponent, ToCardNumberPipe],
    exports: [BankCardComponent],
})
export class BankCardModule {}
