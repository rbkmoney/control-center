import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Field } from 'thrift-ts';

import { Reference } from '../thrift-services/damsel/gen-model/domain';
import { ASTDefinition } from './model';

@Injectable()
export class DefinitionService {
    private def$: Observable<ASTDefinition[]>;

    constructor(private http: HttpClient) {
        this.def$ = this.http.get<ASTDefinition[]>('/assets/meta-damsel.json').pipe(shareReplay(1));
    }

    get astDefinition(): Observable<ASTDefinition[]> {
        return this.def$;
    }

    getDomainObjectType(ref: Reference): Observable<string | null> {
        if (!ref) {
            return of(null);
        }
        const keys = Object.keys(ref);
        if (keys.length !== 1) {
            return of(null);
        }
        const searchName = keys[0];
        return this.getDomainDef().pipe(
            map((d) => {
                const found = d.find(({ name }) => name === searchName);
                return found ? (found.type as string) : null;
            })
        );
    }

    getDomainDef(): Observable<Field[]> {
        return this.def$.pipe(
            map((m) => m.find(({ name }) => name === 'domain').ast.union.DomainObject)
        );
    }
}
