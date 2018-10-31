import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
            this.config = data.reduce((config: any, crutch: any) => {
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
            return data.reduce((base: any, domain: any) => {
                this.setNamespace(base.structs, 'base');
                this.setNamespace(domain.structs, 'domain');
                return {
                    enums: base.enums.concat(domain.enums),
                    structs: base.structs.concat(domain.structs) || []
                };
            });
        });
    }

    private setNamespace(structs: any[], namespace: string) {
        structs.forEach((struct) => struct.namespace = namespace);
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
