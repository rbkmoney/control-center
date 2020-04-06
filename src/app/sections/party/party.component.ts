import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'party.component.html',
    styleUrls: ['party.component.scss']
})
export class PartyComponent implements OnInit {
    links = [
        { name: 'Claims', url: 'claims' },
        { name: 'Shops', url: 'shops' }
    ];

    partyID: string;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe(({ partyID }) => (this.partyID = partyID));
    }
}
