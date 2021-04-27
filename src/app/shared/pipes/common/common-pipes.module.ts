import { NgModule } from '@angular/core';

import { CurrencyPipe } from './currency.pipe';
import { FormatAmountPipe } from './format-amount.pipe';

const PIPES = [CurrencyPipe, FormatAmountPipe];

@NgModule({
    declarations: PIPES,
    exports: PIPES,
})
export class CommonPipesModule {}
