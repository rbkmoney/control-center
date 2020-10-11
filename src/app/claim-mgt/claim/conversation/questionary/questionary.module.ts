import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

import { DetailsItemModule } from '@cc/components/details-item';

import { AuthorityConfirmingDocumentTitlePipe } from './authority-confirming-document-title.pipe';
import { BankAccountInfoComponent } from './bank-account-info';
import { BeneficialOwnerInfoComponent } from './beneficial-owner-info';
import { ContactInfoComponent } from './contact-info';
import { EmptyDefaultPipe } from './empty-default.pipe';
import { IdentityDocumentInfoComponent } from './identity-document-info';
import { IndividualEntityInfoComponent } from './individual-entity-info';
import { LegalOwnerInfoComponent } from './legal-owner-info';
import {
    InternationalEntityComponent,
    OrganizationInfoComponent,
    RussianEntityComponent,
} from './organization-info';
import { PdlInfoComponent } from './pdl-info';
import { PrivateEntityInfoComponent } from './private-entity-info';
import { QuestionaryComponent } from './questionary.component';
import { SerialNumberPipe } from './serial-number.pipe';
import { ShopInfoComponent } from './shop-info';
import { YesNoPipe } from './yes-no.pipe';

@NgModule({
    imports: [
        LayoutModule,
        MatButtonModule,
        FlexLayoutModule,
        CommonModule,
        MatExpansionModule,
        MatCardModule,
        MatListModule,
        DetailsItemModule,
    ],
    declarations: [
        QuestionaryComponent,
        RussianEntityComponent,
        InternationalEntityComponent,
        OrganizationInfoComponent,
        YesNoPipe,
        LegalOwnerInfoComponent,
        EmptyDefaultPipe,
        AuthorityConfirmingDocumentTitlePipe,
        IndividualEntityInfoComponent,
        IdentityDocumentInfoComponent,
        BankAccountInfoComponent,
        ShopInfoComponent,
        ContactInfoComponent,
        PrivateEntityInfoComponent,
        SerialNumberPipe,
        BeneficialOwnerInfoComponent,
        PdlInfoComponent,
    ],
    exports: [QuestionaryComponent],
})
export class QuestionaryModule {}
