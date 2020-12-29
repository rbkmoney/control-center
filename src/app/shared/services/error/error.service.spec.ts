import { TestBed } from '@angular/core/testing';
import { instance, mock, verify } from 'ts-mockito';

import { NotificationService } from '../notification';
import { ErrorService } from './error.service';

describe('ErrorService', () => {
    let mockNotificationService: NotificationService;
    let service: ErrorService;

    beforeEach(() => {
        mockNotificationService = mock(NotificationService);

        TestBed.configureTestingModule({
            providers: [
                ErrorService,
                {
                    provide: NotificationService,
                    useValue: instance(mockNotificationService),
                },
            ],
        });

        service = TestBed.inject(ErrorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('error without message', () => {
        service.error('error');
        verify(mockNotificationService.error(undefined)).once();
        expect().nothing();
    });

    it('error with message', () => {
        service.error('error', 'error message');
        verify(mockNotificationService.error('error message')).once();
        expect().nothing();
    });
});
