import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { BusinessScheduleObject } from '../../../damsel/domain';
import { DomainTypedManager } from '../../../domain/domain-typed-manager';

@Component({
    selector: 'cc-schedule-ref',
    templateUrl: 'schedule-ref.component.html'
})
export class ScheduleRefComponent implements OnInit {

    @Input()
    form: FormGroup;

    payoutSchedules$: Observable<BusinessScheduleObject[]>;

    constructor(private fb: FormBuilder,
                private domainManager: DomainTypedManager) {
    }

    ngOnInit() {
        this.form.registerControl('id', this.fb.control('RUB', Validators.required));
        this.payoutSchedules$ = this.domainManager.getBusinessScheduleObjects();
    }
}
