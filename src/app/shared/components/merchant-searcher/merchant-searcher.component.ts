import { FocusMonitor } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { Component, ElementRef, OnInit, Optional, Self } from '@angular/core';
import { FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ErrorStateMatcher } from '@angular/material/core';
import { debounceTime, take } from 'rxjs/operators';

import { CustomFormControl } from '@cc/components/utils';

import { FetchPartiesService } from '../../services';

@Component({
    selector: 'cc-merchant-searcher',
    templateUrl: 'merchant-searcher.component.html',
    styleUrls: ['merchant-searcher.component.scss'],
    providers: [FetchPartiesService],
})
export class MerchantSearcherComponent extends CustomFormControl implements OnInit {
    searchControl = new FormControl();
    parties$ = this.fetchMarchantsService.parties$;

    constructor(
        private fetchMarchantsService: FetchPartiesService,
        focusMonitor: FocusMonitor,
        elementRef: ElementRef<HTMLElement>,
        @Optional() @Self() public ngControl: NgControl,
        platform: Platform,
        autofillMonitor: AutofillMonitor,
        defaultErrorStateMatcher: ErrorStateMatcher,
        @Optional() parentForm: NgForm,
        @Optional() parentFormGroup: FormGroupDirective
    ) {
        super(
            focusMonitor,
            elementRef,
            platform,
            ngControl,
            autofillMonitor,
            defaultErrorStateMatcher,
            parentForm,
            parentFormGroup
        );
        this.searchControl.valueChanges.pipe(debounceTime(400)).subscribe((v) => {
            if (v === '') {
                this.formControl.patchValue(v);
            } else {
                this.fetchMarchantsService.searchParties({ text: v });
            }
        });

        this.parties$.pipe(take(1)).subscribe((parties) => {
            const { value } = this.formControl;
            if (value && value !== '') {
                const party = parties?.find((p) => p.id === this.formControl.value);
                if (party) {
                    this.searchControl.patchValue(party.email);
                }
            }
        });
    }

    optionSelectedHandler(e: MatAutocompleteSelectedEvent) {
        const { value } = e.option;
        this.formControl.patchValue(value.id);
        this.searchControl.patchValue(value.email);
    }

    ngOnInit() {
        super.ngAfterViewInit();
        const { value } = this.formControl;
        if (value && value !== '') {
            this.searchControl.patchValue(value);
            this.fetchMarchantsService.searchParties({ text: value });
        }
    }
}
