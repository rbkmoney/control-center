import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface AstDefenition {
    type: string;
    name: string;
    id: number;
    option?: 'optional' | 'required';
}

export interface Ast {
    union?: {
        [key: string]: AstDefenition[];
    };
}

export interface Metadata {
    path: string;
    name: string;
    ast: Ast;
}

@Injectable()
export class MetadataLoader {
    private metadata: Metadata[];

    constructor(private http: HttpClient) {}

    load(): Observable<Metadata[]> {
        if (this.metadata) {
            return Observable.create(obs => {
                obs.next(this.metadata);
                obs.complete();
            });
        }
        return this.http
            .get<Metadata[]>('/assets/meta-damsel.json')
            .pipe(tap(m => (this.metadata = m)));
    }
}
