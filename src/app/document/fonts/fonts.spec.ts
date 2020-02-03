import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FontsService } from './fonts.service';

describe('FontsService', () => {
    const fonts = {
        serif: {
            normal: '/assets/regular.ttf'
        }
    };

    function createDocumentFontsServiceService() {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [FontsService]
        });
        const injector = getTestBed();
        const service: FontsService = injector.get(FontsService);
        const httpMock: HttpTestingController = injector.get(HttpTestingController);
        return { injector, service, httpMock };
    }

    it('should load fonts', () => {
        const { service, httpMock } = createDocumentFontsServiceService();
        const blob = new Blob([new Uint8Array(2)]);
        service.loadFonts(fonts);
        service.fontsData$.subscribe(result => {
            expect(result).toEqual({
                vfs: { serif_normal: 'AAA=' },
                fonts: { serif: { normal: 'serif_normal' } }
            });
        });
        const req = httpMock.expectOne('/assets/regular.ttf');
        req.flush(blob);
        expect(req.request.method).toBe('GET');
    });
});
