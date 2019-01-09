import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    constructor(private http: HttpClient) {}

    load(): Observable<Metadata[]> {
        return this.http.get<Metadata[]>('assets/meta-damsel.json'); // TODO need to cache
    }
}
