import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';

import { YesNoPipe } from './yes-no.pipe';
import { OrganizationInfoComponent } from './organization-info';
import { QuestionaryComponent } from './questionary.component';
import { DetailsItemModule } from '../../../../shared/components/details-item';
import { LegalOwnerInfoComponent } from './legal-owner-info';
import { EmptyDefaultPipe } from './empty-default.pipe';
import { AuthorityConfirmingDocumentTitlePipe } from './authority-confirming-document-title.pipe';
import { IndividualEntityInfoComponent } from './individual-entity-info';
import { IdentityDocumentInfoComponent } from './identity-document-info';
import { BankAccountInfoComponent } from './bank-account-info';
import { ShopInfoComponent } from './shop-info';
import { ContactInfoComponent } from './contact-info';
import { PrivateEntityInfoComponent } from './private-entity-info';
import { SerialNumberPipe } from './serial-number.pipe';
import { BeneficialOwnerInfoComponent } from './beneficial-owner-info';
import { PdlInfoComponent } from './pdl-info';

@NgModule({
    imports: [
        LayoutModule,
        MatButtonModule,
        FlexLayoutModule,
        CommonModule,
        MatExpansionModule,
        MatCardModule,
        MatListModule,
        DetailsItemModule
    ],
    declarations: [
        QuestionaryComponent,
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
        PdlInfoComponent
    ],
    exports: [QuestionaryComponent]
})
export class QuestionaryModule {}
