import { Component, Input, OnInit } from '@angular/core';

import {
    ContractID,
    Contractor,
    PartyID,
} from '../../../../thrift-services/damsel/gen-model/domain';
import { FetchContractorService } from './fetch-contractor.service';

@Component({
    selector: 'cc-contractor-details',
    templateUrl: 'contractor-details.component.html',
    providers: [FetchContractorService],
})
export class ContractorDetailsComponent implements OnInit {
    @Input()
    contractID: ContractID;

    @Input()
    partyID: PartyID;

    contractor$ = this.fetchContractorService.contractor$;

    constructor(private fetchContractorService: FetchContractorService) {}

    ngOnInit() {
        this.fetchContractorService.getContractor({
            partyID: this.partyID,
            contractID: this.contractID,
        });
    }

    getINN(contractor: Contractor) {
        return contractor.legal_entity?.russian_legal_entity?.inn || '-';
    }

    getRegName(contractor: Contractor) {
        return (
            contractor.legal_entity?.russian_legal_entity?.registered_name ||
            contractor.legal_entity?.international_legal_entity?.trading_name ||
            '-'
        );
    }
}
