import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CreateLocationService } from './create-location.service';

@Component({
    selector: 'cc-create-location',
    templateUrl: 'create-location.component.html'
})
export class CreateLocationComponent implements OnInit {

    form: FormGroup;

    constructor(private createLocationService: CreateLocationService) {
    }

    ngOnInit() {
        this.form = this.createLocationService.form;
    }
}
