import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { FontsService } from './fonts.service';

describe('FontsService', () => {
    const fonts = {
        serif: {
            normal: '/assets/regular.ttf',
        },
    };

    function createDocumentFontsServiceService() {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [FontsService],
        });
        const injector = getTestBed();
        // tslint:disable-next-line: deprecation
        const service: FontsService = injector.get(FontsService);
        // tslint:disable-next-line: deprecation
        const httpMock: HttpTestingController = injector.get(HttpTestingController);
        return { injector, service, httpMock };
    }

    it('should load fonts', () => {
        const { service, httpMock } = createDocumentFontsServiceService();
        const blob = new Blob([new Uint8Array(2)]);
        service.loadFonts(fonts);
        service.fontsData$.subscribe((result) => {
            expect(result).toEqual({
                vfs: { serif_normal: 'AAA=' },
                fonts: { serif: { normal: 'serif_normal' } },
            });
        });
        const req = httpMock.expectOne('/assets/regular.ttf');
        req.flush(blob);
        expect(req.request.method).toBe('GET');
    });
});
