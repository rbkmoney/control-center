import { Component } from '@angular/core';

@Component({
    templateUrl: 'party-mgt.component.html'
})
export class PartyMgtComponent {
    links = [
        {name: 'Claims', url: 'claims'},
        {name: 'Shops', url: 'shops'}
    ]
}