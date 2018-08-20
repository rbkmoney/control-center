import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ClaimsModule } from './claims/claims.module';
import { AppRoutingModule } from './app-routing.module';
import { ClaimModule } from './claim/claim.module';
import { PayoutsModule } from './payouts/payouts.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CoreModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatSidenavModule,
        MatListModule,
        ClaimsModule,
        ClaimModule,
        PayoutsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
