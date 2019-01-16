import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cc-business-schedule-ref',
    templateUrl: 'business-schedule-ref.component.html'
})
export class BusinessScheduleRefComponent implements OnInit {
    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form.registerControl('id', this.fb.control('', Validators.required));
    }

    scheduleIdChange(id: number) {
        this.form.controls.id.setValue(id);
    }
}
