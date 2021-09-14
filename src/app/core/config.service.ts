import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import type AppConfig from '../../assets/appConfig.json';

@Injectable()
export class ConfigService {
    config: typeof AppConfig;

    constructor(private http: HttpClient) {}

    load(): Promise<void> {
        return new Promise((resolve) => {
            this.http.get<typeof AppConfig>('assets/appConfig.json').subscribe((config) => {
                this.config = config;
                resolve(undefined);
            });
        });
    }
}
