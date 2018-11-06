import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectChange, MatSnackBar } from '@angular/material';
import { tap } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';

import { BusinessScheduleObject } from '../../../damsel/domain';
import { DomainTypedManager } from '../../../claim/domain-typed-manager';

@Component({
    selector: 'cc-business-schedule-selector',
    templateUrl: 'business-schedule-selector.component.html'
})
export class BusinessScheduleSelectorComponent implements OnInit {

    @Output()
    idChange = new EventEmitter<number>();

    schedules$: Observable<BusinessScheduleObject[]>;

    isLoading = true;

    hasError = false;

    constructor(private domainManager: DomainTypedManager,
                private snackBar: MatSnackBar) {
    }

    selectionChange(change: MatSelectChange) {
        this.idChange.emit(change.value);
    }

    ngOnInit() {
        this.schedules$ = this.domainManager
            .getBusinessScheduleObjects()
            .pipe(tap(
                () => {
                    this.isLoading = false;
                },
                () => {
                    this.isLoading = false;
                    this.hasError = true;
                    this.snackBar.open('An error occurred while business schedule receiving', 'OK');
                }));
    }
}