import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest, ReplaySubject } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';

type DelegateId = {
    parentRefId: number;
    delegateIdx: number;
};

@Component({
    selector: 'cc-routing-rules-list',
    templateUrl: 'routing-rules-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutingRulesListComponent<T extends { [N in PropertyKey]: any } & DelegateId = any> {
    @Input() displayedColumns: { key: keyof T; name: string }[];

    @Input() set data(data: T[]) {
        this.data$.next(data);
    }
    private data$ = new ReplaySubject<T[]>(1);

    endColumns = [
        {
            key: 'actions',
            name: 'Actions',
        },
    ];

    @Output() toDetails = new EventEmitter<DelegateId>();
    @Output() changeTarget = new EventEmitter<DelegateId>();
    @Output() delete = new EventEmitter<DelegateId>();

    @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
        this.paginator$.next(paginator);
    }
    private paginator$ = new ReplaySubject<MatPaginator>(1);

    dataSource$ = combineLatest([
        this.data$,
        this.paginator$.pipe(startWith<any, null>(null)),
    ]).pipe(
        map(([d, paginator]) => {
            const data = new MatTableDataSource(d);
            data.paginator = paginator;
            return data;
        }),
        shareReplay(1)
    );

    getColumnsKeys(col) {
        return col.key;
    }
}
