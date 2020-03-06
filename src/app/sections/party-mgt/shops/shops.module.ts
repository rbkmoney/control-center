import { NgModule } from '@angular/core';
import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ShopsRoutingModule, CommonModule],
    declarations: [ShopsComponent]
})
export class ShopsModule {}
