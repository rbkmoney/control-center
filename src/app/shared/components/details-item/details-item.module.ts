import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { DetailsItemComponent } from './details-item.component';

@NgModule({
    declarations: [DetailsItemComponent],
    exports: [DetailsItemComponent],
    imports: [FlexModule],
})
export class DetailsItemModule {}
