import { Injectable } from '@angular/core';
import {
    createPdf,
    TableLayoutFunctions,
    TCreatedPdf,
    TDocumentDefinitions
} from 'pdfmake/build/pdfmake';
import { Observable } from 'rxjs';
import { map, timeout } from 'rxjs/operators';

import { FontsService } from './fonts';
import { fontsConfig } from './fonts-config';

@Injectable()
export class DocumentService {
    constructor(private fontsService: FontsService) {
        this.fontsService.loadFonts(fontsConfig);
    }

    createPdf(
        docDefinition: TDocumentDefinitions,
        tableLayouts?: { [name: string]: TableLayoutFunctions }
    ): Observable<TCreatedPdf> {
        return this.fontsService.fontsData$.pipe(
            timeout(5000),
            map(({ fonts, vfs }) => createPdf(docDefinition, tableLayouts, fonts, vfs))
        );
    }
}
