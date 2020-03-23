import { Component, OnInit } from '@angular/core';

import { SearchFormValue } from './search-form/search-form-value';

@Component({
    templateUrl: './search-claims.component.html'
})
export class SearchClaimsComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    search(searchFormValue: SearchFormValue) {
        console.log(searchFormValue);
    }
}
