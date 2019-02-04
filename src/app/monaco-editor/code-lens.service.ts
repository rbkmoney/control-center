import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { CodeLensProvider, IDisposable } from './model';

@Injectable()
export class CodeLensService {
    private providers$ = new Subject<CodeLensProvider[]>();
    private registered$ = new Subject<IDisposable[]>();
    private disposableRegister: IDisposable[] = [];

    get providers(): Observable<CodeLensProvider[]> {
        return this.providers$;
    }

    get registered(): Observable<IDisposable[]> {
        return this.registered$;
    }

    add(providers: CodeLensProvider[]) {
        this.providers$.next(providers);
    }

    register(providers: CodeLensProvider[]) {
        if (!providers) {
            return;
        }
        let disposes = [];
        for (const provider of providers) {
            const disposable = monaco.languages.registerCodeLensProvider(
                provider.language,
                provider
            );
            disposes = [...disposes, disposable];
        }
        this.disposableRegister = [...this.disposableRegister, ...disposes];
        this.registered$.next(disposes);
    }

    dispose() {
        for (const disposable of this.disposableRegister) {
            disposable.dispose();
        }
    }
}
