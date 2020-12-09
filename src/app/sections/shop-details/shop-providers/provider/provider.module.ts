import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

import { ProviderComponent } from './provider.component';
import { TerminalsInfoTableModule } from './terminals-info-table/terminals-info-table.module';

@NgModule({
    declarations: [ProviderComponent],
    exports: [ProviderComponent],
    imports: [MatCardModule, FlexModule, TerminalsInfoTableModule],
})
export class ProviderModule {}
