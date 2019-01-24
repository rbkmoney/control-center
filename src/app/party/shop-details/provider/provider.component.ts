import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProviderObject } from '../../../damsel/domain';
import { findTerminalIds } from '../find-terminal-ids';

@Component({
    selector: 'cc-provider',
    templateUrl: 'provider.component.html'
})
export class ProviderComponent implements OnInit {
    terminalIDs: number[];

    private shopID: string;
    private partyID: string;

    @Input() provider: ProviderObject;

    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.shopID = params['shopId'];
            this.partyID = params['partyId'];
        });
    }

    ngOnInit(): void {
        this.terminalIDs = findTerminalIds(
            this.provider.data.terminal.decisions,
            this.shopID,
            this.partyID
        );
    }
}
