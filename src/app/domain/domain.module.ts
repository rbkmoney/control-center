import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTreeModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DomainRoutingModule } from './domain-routing.module';
import { DomainComponent } from './domain.component';
import { DomainService } from './domain.service';
import { MetadataModule } from '../metadata/metadata.module';

@NgModule({
    imports: [
        DomainRoutingModule,
        MatCardModule,
        MetadataModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        FlexLayoutModule,
        MatTreeModule,
        CommonModule,
        MatIconModule,
        MatButtonModule
    ],
    declarations: [
        DomainComponent
    ],
    providers: [
        DomainService
    ]
})
export class DomainModule {
}