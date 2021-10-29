import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
/**
 * @deprecated use KeycloakTokenInfoService
 */
export class KeycloakTokenInfoService {
    userToken: string;
    decodedUserToken: any;

    init(token: string): void {
        this.userToken = token;
        this.decodedUserToken = jwtDecode(token);
    }
}
