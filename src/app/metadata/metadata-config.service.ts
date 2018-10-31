import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable()
export class MetadataConfigService {

    private config: any;

    constructor(private http: HttpClient) { }

    public getMetadataConfig(): any {
        return this.config;
    }

    public load(): Promise<any> {
        return Promise.all([
            this.concatConfigs(),
            this.loadEnumCrutch()
        ]).then((data: any) => {
            this.config = _.reduce(data, (config: any, crutch: any) => {
                config.enumCrutch = crutch;
                return config;
            });
            return this.config;
        });
    }

    private concatConfigs(): Promise<any> {
        return Promise.all([
            this.loadBase(),
            this.loadDomain()
        ]).then((data: any) => {
            return _.reduce(data, (base: any, domain: any) => {
                this.setNamespace(base.structs, 'base');
                this.setNamespace(domain.structs, 'domain');
                return {
                    enums: _.concat(base.enums, domain.enums),
                    structs: _.concat(base.structs, domain.structs) || []
                };
            });
        });
    }

    private setNamespace(structs: any[], namespace: string) {
        _.forEach(structs, (struct) => struct.namespace = namespace);
    }

    private loadBase(): Promise<any> {
        return this.http.get('/assets/gen-json/base.json').toPromise();
    }

    private loadDomain(): Promise<any> {
        return this.http.get('/assets/gen-json/domain.json').toPromise();
    }

    private loadEnumCrutch(): Promise<any> {
        return this.http.get('/assets/enumCrutch.json').toPromise();
    }

}
