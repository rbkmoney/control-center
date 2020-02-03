import { Observable } from 'rxjs';

export function blobToBase64(blob: Blob): Observable<string> {
    return new Observable(observer => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            observer.next(reader.result.toString().split(';base64,')[1]);
            observer.complete();
        };
    });
}
