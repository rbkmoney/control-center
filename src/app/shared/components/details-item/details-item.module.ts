import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DetailsItemComponent } from './details-item.component';

@NgModule({
    declarations: [DetailsItemComponent],
    exports: [DetailsItemComponent],
    imports: [FlexLayoutModule],
})
export class DetailsItemModule {}
