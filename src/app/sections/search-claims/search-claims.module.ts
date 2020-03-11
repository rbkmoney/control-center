import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchClaimsComponent } from './search-claims.component';
import { SearchClaimsComponentRouting } from './search-claims-routing.module';

@NgModule({
  declarations: [SearchClaimsComponent],
  imports: [
    CommonModule,
    SearchClaimsComponentRouting
  ]
})
export class SearchClaimsModule { }
