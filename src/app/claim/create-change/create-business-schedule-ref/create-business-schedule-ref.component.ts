import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { CreateBusinessScheduleRefService } from './create-business-schedule-ref.service';
import { BusinessScheduleObject } from '../../../damsel/domain';
import { DomainTypedManager } from '../../../domain/domain-typed-manager';

@Component({
    selector: 'cc-create-business-schedule-ref',
    templateUrl: 'create-business-schedule-ref.component.html'
})
export class CreateBusinessScheduleRefComponent implements OnInit {

    form: FormGroup;

    payoutSchedules$: Observable<BusinessScheduleObject[]>;

    constructor(
        private createBusinessScheduleRefService: CreateBusinessScheduleRefService,
        private domainManager: DomainTypedManager) {
    }

    ngOnInit() {
        this.form = this.createBusinessScheduleRefService.form;
        this.payoutSchedules$ = this.domainManager.getBusinessScheduleObjects();
    }
}
