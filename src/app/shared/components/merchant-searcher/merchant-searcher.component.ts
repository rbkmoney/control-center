import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { PartyID } from '../../../thrift-services/deanonimus/gen-model/deanonimus';
import { FetchPartiesService } from '../../services';

@Component({
    selector: 'cc-merchant-searcher',
    templateUrl: 'merchant-searcher.component.html',
    styleUrls: ['merchant-searcher.component.scss'],
    providers: [FetchPartiesService],
})
export class MerchantSearcherComponent {
    @Input()
    set initValue(partyID: string) {
        this.searchControl.patchValue(partyID);
    }

    @Output()
    partySelected$: EventEmitter<PartyID> = new EventEmitter();

    parties$ = this.fetchMarchantsService.parties$;
    searchControl = new FormControl();

    constructor(private fetchMarchantsService: FetchPartiesService) {
        this.searchControl.valueChanges.pipe(debounceTime(400)).subscribe((text) => {
            if (text !== '') {
                this.fetchMarchantsService.search({ text });
            } else {
                this.partySelected$.emit('');
            }
        });
    }

    partySelected(partyID: PartyID) {
        this.partySelected$.emit(partyID);
    }
}
