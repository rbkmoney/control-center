import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MAT_DATE_LOCALE,
    DateAdapter,
    MAT_DATE_FORMATS
} from '@angular/material';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter
} from '@angular/material-moment-adapter';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ClaimsModule } from './claims/claims.module';
import { AppRoutingModule } from './app-routing.module';
import { ClaimModule } from './claim/claim.module';
import { PayoutsModule } from './payouts/payouts.module';
import { PaymentAdjustmentModule } from './payment-adjustment/payment-adjustment.module';
import { PartiesModule } from './parties/parties.module';
import { PartyModule } from './party/party.module';
import { DomainModule } from './domain';
import { RepairingModule } from './repairing/repairing.module';
import { DepositsModule } from './deposits/deposits.module';
import { ClaimMgtModule } from './claim-mgt/claim-mgt.module';

@NgModule({
    declarations: [AppComponent],
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
        PayoutsModule,
        PaymentAdjustmentModule,
        PartiesModule,
        PartyModule,
        DomainModule,
        RepairingModule,
        DepositsModule,
        ClaimMgtModule
    ],
    providers: [
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_LOCALE, useValue: 'ru' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
