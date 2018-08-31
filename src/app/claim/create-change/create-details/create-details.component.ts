import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CreateDetailsService } from './create-details.service';

@Component({
    selector: 'cc-create-details',
    templateUrl: 'create-details.component.html'
})
export class CreateDetailsComponent implements OnInit {

    form: FormGroup;

    constructor(private createDetailsService: CreateDetailsService) {
    }

    ngOnInit() {
        this.form = this.createDetailsService.form;
    }
}
