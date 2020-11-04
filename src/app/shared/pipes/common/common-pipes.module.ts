import { NgModule } from '@angular/core';

import { CurrencyPipe } from './currency.pipe';
import { FormatAmountPipe } from './format-amount.pipe';

const pipes = [CurrencyPipe, FormatAmountPipe];

@NgModule({
    declarations: pipes,
    exports: pipes,
})
export class CommonPipesModule {}
