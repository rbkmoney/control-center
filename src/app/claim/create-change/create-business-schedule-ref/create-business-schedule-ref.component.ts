import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CreateBusinessScheduleRefService } from './create-business-schedule-ref.service';

@Component({
    templateUrl: 'create-business-schedule-ref.component.html'
})
export class CreateBusinessScheduleRefComponent implements OnInit {

    form: FormGroup;

    constructor(private createBusinessScheduleRefService: CreateBusinessScheduleRefService) {
    }

    ngOnInit() {
        this.form = this.createBusinessScheduleRefService.form;
    }
}
