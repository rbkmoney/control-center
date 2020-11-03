import { FocusMonitor } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Optional,
    Output,
    Self,
} from '@angular/core';
import { FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ErrorStateMatcher } from '@angular/material/core';
import { debounceTime, filter } from 'rxjs/operators';

import { CustomFormControl } from '@cc/components/utils';

import { Party } from '../../../thrift-services/deanonimus/gen-model/deanonimus';
import { FetchPartiesService } from '../../services';

@Component({
    selector: 'cc-merchant-searcher',
    templateUrl: 'merchant-searcher.component.html',
    styleUrls: ['merchant-searcher.component.scss'],
    providers: [FetchPartiesService],
})
export class MerchantSearcherComponent extends CustomFormControl implements AfterViewInit {
    @Output()
    partySelected$ = new EventEmitter<Party>();

    searchControl = new FormControl();
    parties$ = this.fetchMarchantsService.parties$;
    isOptionsLoading$ = this.fetchMarchantsService.inProgress$;

    private initialized = false;

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

        this.parties$.pipe(filter(() => !this.initialized)).subscribe((parties) => {
            this.initialized = true;
            const { value } = this.formControl;
            if (value && value !== '') {
                const { email } = parties.find((party) => party.id === this.formControl.value);
                this.searchControl.patchValue(email);
            }
        });
    }

    optionSelectedHandler(e: MatAutocompleteSelectedEvent) {
        const { value } = e.option;
        this.formControl.patchValue(value.id);
        this.searchControl.patchValue(value.email);
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        const { value } = this.formControl;
        if (value && value !== '') {
            this.fetchMarchantsService.searchParties({ text: value });
        }
    }
}
