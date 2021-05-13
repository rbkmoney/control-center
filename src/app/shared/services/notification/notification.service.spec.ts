import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { instance, mock, objectContaining, verify } from 'ts-mockito';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
    let mockMatSnackBar: MatSnackBar;
    let service: NotificationService;

    beforeEach(() => {
        mockMatSnackBar = mock(MatSnackBar);

        TestBed.configureTestingModule({
            providers: [
                NotificationService,
                {
                    provide: MatSnackBar,
                    useValue: instance(mockMatSnackBar),
                },
            ],
        });

        service = TestBed.inject(NotificationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('success', () => {
        service.success();
        verify(mockMatSnackBar.open('Success', 'OK', objectContaining({ duration: 3000 }))).once();
        expect().nothing();
    });
});
