import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { DomainTypedManager } from '../../../claim/domain-typed-manager';
import { BusinessScheduleObject } from '../../../damsel/domain';

@Component({
    selector: 'cc-business-schedule-ref',
    templateUrl: 'business-schedule-ref.component.html'
})
export class BusinessScheduleRefComponent implements OnInit {

    @Input()
    form: FormGroup;

    payoutSchedules$: Observable<BusinessScheduleObject[]>;

    constructor(private fb: FormBuilder,
                private domainManager: DomainTypedManager) {
    }

    ngOnInit() {
        this.form.registerControl('id', this.fb.control('', Validators.required));
        this.payoutSchedules$ = this.domainManager.getBusinessScheduleObjects();
    }
}
