import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MetadataService {

    public ast: any;

    constructor(private http: HttpClient) {}

    public async init(url: string): Promise<void> {
        this.ast = await this.http.get(url).toPromise();
    }
}
