import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClaimSearchParams } from './params/claim-search-params';
import { ClaimInfo } from './model/claim-info';
import { ConfigService } from '../core/config.service';

@Injectable()
export class ClaimService {

    private readonly papiEndpoint: string;

    constructor(private http: HttpClient, private configService: ConfigService) {
        this.papiEndpoint = configService.config.papiEndpoint;
    }

    getClaims(params: ClaimSearchParams): Observable<ClaimInfo[]> {
        return this.http.post<ClaimInfo[]>(`${this.papiEndpoint}/walk/claim/search`, params);
    }
}
