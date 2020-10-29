import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { decode, encode } from '@cc/utils/index';

import { ConfigService } from '../core/config.service';
import { ClaimCreated, ClaimInfo, PartyModificationUnit } from './model';
import { ClaimAcceptParams, ClaimDenyParams, ClaimSearchParams } from './params';

@Injectable()
export class ClaimService {
    private readonly papiEndpoint: string;

    constructor(private http: HttpClient, configService: ConfigService) {
        this.papiEndpoint = configService.config.papiEndpoint;
    }

    getClaims(params: ClaimSearchParams): Observable<ClaimInfo[]> {
        return this.http.post<ClaimInfo[]>(`${this.papiEndpoint}/walk/claim/search`, params);
    }

    getClaim(partyID: string, claimID: number): Observable<ClaimInfo> {
        const params = new HttpParams().set('partyId', partyID).set('claimId', claimID.toString());
        return this.http
            .get<ClaimInfo>(`${this.papiEndpoint}/walk/claim`, { params })
            .pipe(map((claim) => decode(claim)));
    }

    createClaim(partyID: string, unit: PartyModificationUnit): Observable<ClaimCreated> {
        const params = new HttpParams().set('partyId', partyID);
        return this.http.post<ClaimCreated>(`${this.papiEndpoint}/walk/claim`, encode(unit), {
            params,
        });
    }

    updateClaim(
        partyID: string,
        claimID: number,
        revision: string,
        unit: PartyModificationUnit
    ): Observable<void> {
        const params = new HttpParams()
            .set('partyId', partyID)
            .set('claimId', claimID.toString())
            .set('revision', revision);
        return this.http.post<void>(`${this.papiEndpoint}/walk/claim/update`, encode(unit), {
            params,
        });
    }

    acceptClaim(params: ClaimAcceptParams): Observable<void> {
        return this.http.post<void>(`${this.papiEndpoint}/walk/claim/accept`, params);
    }

    denyClaim(params: ClaimDenyParams): Observable<void> {
        return this.http.post<void>(`${this.papiEndpoint}/walk/claim/deny`, params);
    }
}
