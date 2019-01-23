import { Injectable } from '@angular/core';
import { TerminalObject } from '../../damsel/domain';
import { Observable } from 'rxjs';
import { DomainTypedManager } from '../../thrift/domain-typed-manager';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ShopDetailsService {
    private terminalObjects: TerminalObject[];

    constructor(private dtm: DomainTypedManager) {}

    getTerminalObject(id: number): Observable<TerminalObject> {
        const terminalObject = this.terminalObjects
            ? this.terminalObjects.find(terminal => terminal.ref.id === id)
            : null;
        if (terminalObject) {
            return Observable.create(observer => {
                observer.next(terminalObject);
                observer.complete();
            });
        } else {
            return this.dtm.getTerminalObjects().pipe(
                tap(objects => {
                    this.terminalObjects = objects;
                }),
                map(objects => objects.find(obj => obj.ref.id === id))
            );
        }
    }
}
