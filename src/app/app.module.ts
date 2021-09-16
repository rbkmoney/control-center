import { NgModule } from '@angular/core';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { createSentryProviders } from '@rbkmoney/sentry';
import * as moment from 'moment';

import { KeycloakTokenInfoModule } from '@cc/app/shared/services';
import 'moment/locale/ru';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClaimMgtModule } from './claim-mgt/claim-mgt.module';
import { ClaimModule } from './claim/claim.module';
import { ClaimsModule } from './claims/claims.module';
import { CoreModule } from './core/core.module';
import { DomainModule } from './domain';
import icons from './icons.json';
import { NotFoundModule } from './not-found';
import { PayoutsModule } from './payouts/payouts.module';
import { RepairingModule } from './repairing/repairing.module';
import { DomainConfigModule } from './sections/domain-config';
import { OperationsModule } from './sections/operations/operations.module';
import { PartyModule } from './sections/party/party.module';
import { PaymentAdjustmentModule } from './sections/payment-adjustment/payment-adjustment.module';
import { SearchClaimsModule } from './sections/search-claims/search-claims.module';
import { SearchPartiesModule } from './sections/search-parties/search-parties.module';
import { SettingsModule } from './settings';
import { ThemeManager, ThemeManagerModule, ThemeName } from './theme-manager';
import {
    DEFAULT_DIALOG_CONFIG,
    DEFAULT_SEARCH_LIMIT,
    DEFAULT_SMALL_SEARCH_LIMIT,
    DIALOG_CONFIG,
    SEARCH_LIMIT,
    SMALL_SEARCH_LIMIT,
} from './tokens';

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
        DomainModule,
        RepairingModule,
        ThemeManagerModule,
        SettingsModule,
        ClaimMgtModule,
        PartyModule,
        SearchPartiesModule,
        SearchClaimsModule,
        OperationsModule,
        DomainConfigModule,
        KeycloakTokenInfoModule,
        // It is important that NotFoundModule module should be last
        NotFoundModule,
    ],
    providers: [
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_LOCALE, useValue: 'en' },
        { provide: SEARCH_LIMIT, useValue: DEFAULT_SEARCH_LIMIT },
        { provide: SMALL_SEARCH_LIMIT, useValue: DEFAULT_SMALL_SEARCH_LIMIT },
        { provide: DIALOG_CONFIG, useValue: DEFAULT_DIALOG_CONFIG },
        ...createSentryProviders([Router], { logErrors: environment.production }),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(
        private themeManager: ThemeManager,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {
        this.themeManager.change(ThemeName.Light);
        this.registerIcons();
    }

    registerIcons(): void {
        for (const name of icons) {
            this.matIconRegistry.addSvgIcon(
                name,
                this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/${name}.svg`)
            );
        }
    }
}
