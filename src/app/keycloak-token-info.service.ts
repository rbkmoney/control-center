import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import * as JwtDecode from 'jwt-decode';

@Injectable()
export class KeycloakTokenInfoService {
    userToken: string;
    decodedUserToken: JwtDecode;

    init(token: string) {
        this.userToken = token;
        this.decodedUserToken = jwtDecode(token);
    }
}
