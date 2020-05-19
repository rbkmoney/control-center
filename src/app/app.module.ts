import { NgModule } from '@angular/core';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as moment from 'moment';
import 'moment/locale/ru';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClaimModule } from './claim/claim.module';
import { ClaimsModule } from './claims/claims.module';
import { CoreModule } from './core/core.module';
import { DepositsModule } from './deposits/deposits.module';
import { DomainModule } from './domain';
import { PartiesModule } from './parties/parties.module';
import { PartyModule as OldPartyModule } from './party/party.module';
import { PaymentAdjustmentModule } from './payment-adjustment/payment-adjustment.module';
import { PayoutsModule } from './payouts/payouts.module';
import { RepairingModule } from './repairing/repairing.module';
import { PartyModule } from './sections/party/party.module';
import { SearchClaimsModule } from './sections/search-claims/search-claims.module';

/**
 * For use in specific locations (for example, questionary PDF document)
 */

moment.locale('en');

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
        PartyModule,
        OldPartyModule,
        SearchClaimsModule
    ],
    providers: [
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_LOCALE, useValue: 'en' },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
