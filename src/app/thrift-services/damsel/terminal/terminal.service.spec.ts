import { TestBed } from '@angular/core/testing';

import { TerminalService } from './terminal.service';

describe('TerminalService', () => {
    let service: TerminalService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [TerminalService],
        });

        service = TestBed.inject(TerminalService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
