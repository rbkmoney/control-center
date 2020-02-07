import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import get from 'lodash-es/get';

import { ScheduleModification } from '../../../../thrift-services/damsel/gen-model/payment_processing';

@Component({
    selector: 'cc-shop-schedule-modification',
    templateUrl: 'shop-payout-schedule-modification.component.html'
})
export class ShopPayoutScheduleModificationComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: ScheduleModification;

    showSchedule = false;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        setTimeout(() => {
            this.toggleSchedule();
            this.form.updateValueAndValidity();
        });
    }

    toggleCheckbox(e, data) {
        if (e.checked) {
            this.form.registerControl(data, this.fb.group({}));
        } else {
            this.form.removeControl(data);
        }
    }

    toggleSchedule() {
        const schedule = get(this, 'initialValue.schedule', null);
        this.showSchedule = schedule !== null;
        if (this.showSchedule) {
            this.form.registerControl('schedule', this.fb.group(schedule));
        } else {
            this.form.removeControl('schedule');
        }
    }
}
