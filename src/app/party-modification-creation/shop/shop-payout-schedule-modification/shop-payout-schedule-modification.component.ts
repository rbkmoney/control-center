import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'cc-shop-schedule-modification',
    templateUrl: 'shop-payout-schedule-modification.component.html'
})
export class ShopPayoutScheduleModificationComponent {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    toggleCheckbox(e, data) {
        if (e.checked) {
            this.form.registerControl(data, this.fb.group({}));
        } else {
            this.form.removeControl(data);
        }
    }
}
