import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CreateServiceAcceptanceActPreferencesService } from './create-service-acceptance-act-preferences.service';
import { RepresentativeDocumentType } from '../../../damsel/domain';

@Component({
    selector: 'cc-create-service-acceptance-act-preferences',
    templateUrl: 'create-service-acceptance-act-preferences.component.html'
})
export class CreateServiceAcceptanceActPreferencesComponent {

    form: FormGroup;

    documentTypes = [
        RepresentativeDocumentType.PowerOfAttorney,
        RepresentativeDocumentType.ArticlesOfAssociation
    ];

    constructor(private createServiceAcceptanceActPreferencesService: CreateServiceAcceptanceActPreferencesService) {
        this.form = this.createServiceAcceptanceActPreferencesService.form;
    }
}
