import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

import { ClaimService } from '../backend/claim.service';
import { ClaimSearchParams } from '../backend/params';
import { ClaimInfo } from '../backend/model';

@Component({
    templateUrl: 'claims.component.html',
    styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {

    isLoading = false;

    claims: ClaimInfo[];

    constructor(private claimService: ClaimService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.search({claimStatus: 'pending'});
    }

    search(params: ClaimSearchParams) {
        this.isLoading = true;
        this.claimService.getClaims(params).subscribe((claims) => {
            this.isLoading = false;
            this.claims = claims.reverse();
        }, (error: HttpErrorResponse) => {
            this.isLoading = false;
            this.snackBar.open(`${error.status}: ${error.message}`, 'OK');
        });
    }
}
