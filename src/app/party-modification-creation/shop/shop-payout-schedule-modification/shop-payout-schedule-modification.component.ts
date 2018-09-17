import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'cc-shop-schedule-modification',
    templateUrl: 'shop-payout-schedule-modification.component.html'
})
export class ShopPayoutScheduleModificationComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.registerControl('schedule', this.fb.group({}));
    }
}
