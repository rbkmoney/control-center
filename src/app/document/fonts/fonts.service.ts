import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { switchMap, map, shareReplay } from 'rxjs/operators';

import { blobToBase64 } from './blob-to-base64';
import { toFonts } from './to-fonts';
import { Font } from './font';
import { FontsData } from './fonts-data';

@Injectable()
export class FontsService {
    fontsData$: Observable<FontsData>;

    constructor(private http: HttpClient) {}

    loadFonts(fontsUrls: FontsData['fonts']): Observable<FontsData> {
        const fonts = toFonts(fontsUrls);
        return (this.fontsData$ = forkJoin(fonts.map(({ url }) => this.loadFont(url))).pipe(
            map(fontsBase64 => ({ vfs: this.getVFS(fonts, fontsBase64), fonts: this.getFonts(fonts) })),
            shareReplay(1)
        ));
    }

    private loadFont(url: string): Observable<string> {
        return this.http.get(url, { responseType: 'blob' }).pipe(switchMap(blob => blobToBase64(blob)));
    }

    private getFonts(fonts: Font[]): FontsData['fonts'] {
        return fonts.reduce(
            (accFonts, { family, type, hash }) => {
                if (accFonts[family]) accFonts[family][type] = hash;
                else accFonts[family] = { [type]: hash };
                return accFonts;
            },
            {} as FontsData['fonts']
        );
    }

    private getVFS(fonts: Font[], fontsBase64: string[]): FontsData['vfs'] {
        return fonts.reduce(
            (accVFS, font, idx) => {
                accVFS[font.hash] = fontsBase64[idx];
                return accVFS;
            },
            {} as FontsData['vfs']
        );
    }
}
