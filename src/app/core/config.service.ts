import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AppConfig {
    papiEndpoint: string;
    wapiEndpoint: string;
}

@Injectable()
export class ConfigService {
    config: AppConfig;

    constructor(private http: HttpClient) {}

    load() {
        return new Promise(resolve => {
            this.http.get<AppConfig>('assets/appConfig.json').subscribe(config => {
                this.config = config;
                resolve();
            });
        });
    }
}
