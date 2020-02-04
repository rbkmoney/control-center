import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatExpansionModule, MatListModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';

import { IsNotNilPipe } from './is-not-nil.pipe';
import { YesNoPipe } from './yes-no.pipe';
import { OrganizationInfoComponent } from './organization-info';
import { QuestionaryComponent } from './questionary.component';
import { DetailsItemModule } from '../../../../shared/components/details-item';
import { RussianPrivateEntityInfoComponent } from './legal-owner-info/russian-private-entity-info.component';
import { LegalOwnerInfoComponent } from './legal-owner-info';
import { EmptyDefaultPipe } from './empty-default.pipe';
import { AuthorityConfirmingDocumentTitlePipe } from './authority-confirming-document-title.pipe';

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
        IsNotNilPipe,
        LegalOwnerInfoComponent,
        RussianPrivateEntityInfoComponent,
        EmptyDefaultPipe,
        AuthorityConfirmingDocumentTitlePipe
    ],
    exports: [QuestionaryComponent]
})
export class QuestionaryModule {}
