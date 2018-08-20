import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

import { ClaimInfo, PartyModificationUnit } from './model';
import { ConfigService } from '../core/config.service';
import { ThriftFormatter } from '../shared/thrift-formatter';
import { ClaimAcceptParams, ClaimDenyParams, ClaimSearchParams } from './params';

@Injectable()
export class ClaimService {

    private readonly papiEndpoint: string;

    constructor(private http: HttpClient, private configService: ConfigService) {
        this.papiEndpoint = configService.config.papiEndpoint;
    }

    getClaims(params: ClaimSearchParams): Observable<ClaimInfo[]> {
        return this.http.post<ClaimInfo[]>(`${this.papiEndpoint}/walk/claim/search`, params);
    }

    getClaim(partyID: string, claimID: number): Observable<ClaimInfo> {
        const params = new HttpParams()
            .set('partyId', partyID)
            .set('claimId', claimID.toString());
        return this.http
            .get<ClaimInfo>(`${this.papiEndpoint}/walk/claim`, {params})
            .pipe(map((claim) => ThriftFormatter.decode(claim)));
    }

    updateClaim(partyID: string, claimID: number, revision: string, unit: PartyModificationUnit): Observable<void> {
        const params = new HttpParams()
            .set('partyId', partyID)
            .set('claimId', claimID.toString())
            .set('revision', revision);
        return this.http.post<void>(`${this.papiEndpoint}/walk/claim/update`, ThriftFormatter.encode(unit), {params});
    }

    acceptClaim(params: ClaimAcceptParams): Observable<void> {
        return this.http.post<void>(`${this.papiEndpoint}/walk/claim/accept`, params);
    }

    denyClaim(params: ClaimDenyParams): Observable<void> {
        return this.http.post<void>(`${this.papiEndpoint}/walk/claim/deny`, params);
    }
}
