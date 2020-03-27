import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Claim,
  Metadata
} from '../../../thrift-services/damsel/gen-model/claim_management';

@Component({
  selector: 'cc-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.css']
})
export class SearchTableComponent {

  @Input()
  claims: Claim[];

  displayedColumns = [
    'claimID',
    'party',
    'source',
    'status',
    'updatedAt'
  ];

  constructor(private router: Router) {}

  navigateToClaim(partyID: string, claimID: number) {
    this.router.navigate([`claims/party/${partyID}/claim/${claimID}`]);
  }

  getSourceFromMeta(metadata: Metadata): string {
    return metadata.has('Source') ? metadata.get('Source') as string : 'Unknown';
  }
}
