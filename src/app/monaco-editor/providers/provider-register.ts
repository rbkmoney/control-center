import { Observable, Subject } from 'rxjs';

import { IDisposable, LanguageProvider } from '../model';

export abstract class ProviderRegister<T extends LanguageProvider> {
    private providers$ = new Subject<T[]>();
    private registered$ = new Subject<IDisposable[]>();
    private disposableRegister: IDisposable[] = [];

    get providers(): Observable<T[]> {
        return this.providers$;
    }

    get registered(): Observable<IDisposable[]> {
        return this.registered$;
    }

    add(providers: T[]) {
        this.providers$.next(providers);
    }

    register(providers: T[]) {
        if (!providers) {
            return;
        }
        let disposes = [];
        for (const provider of providers) {
            const disposable = this.registerProvider(provider);
            disposes = [...disposes, disposable];
        }
        this.disposableRegister = [...this.disposableRegister, ...disposes];
        this.registered$.next(disposes);
    }

    dispose() {
        for (const disposable of this.disposableRegister) {
            if (disposable) {
                disposable.dispose();
            }
        }
    }

    protected abstract registerProvider(providers: T): IDisposable;
}
