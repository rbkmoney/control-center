import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Subject } from 'rxjs';

@Injectable()
export class DetailsContainerService {
    opened$: Subject<boolean> = new Subject();

    private detailsContainer: MatSidenav;

    set container(sidenav: MatSidenav) {
        this.detailsContainer = sidenav;
        this.detailsContainer.openedChange.subscribe(opened => this.opened$.next(opened));
    }

    open() {
        this.detailsContainer.open();
    }

    close() {
        this.detailsContainer.close();
    }
}
