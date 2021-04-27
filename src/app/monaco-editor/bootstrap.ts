import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const window: any;

export const BOOTSTRAP$ = new Observable<void>((observer) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'libs/vs/loader.js';
    script.onload = () => {
        window.require.config({ paths: { vs: 'libs/vs' } });
        window.require(['vs/editor/editor.main'], () => {
            observer.next();
        });
    };
    document.body.appendChild(script);
}).pipe(shareReplay(1));
