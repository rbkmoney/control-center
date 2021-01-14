import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, ReplaySubject } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '../../../../components/confirm-action-dialog';
import { handleError } from '../../../../utils/operators/handle-error';
import { ErrorService } from '../../../shared/services/error';
import { RoutingRulesService } from '../../../thrift-services';
import { ChangeDelegateRulesetDialogComponent } from '../change-delegate-ruleset-dialog';
import { ChangeTargetDialogComponent } from '../change-target-dialog';

type DelegateId = {
    parentRefId: number;
    delegateIdx: number;
};

@UntilDestroy()
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

    constructor(
        private dialog: MatDialog,
        private errorService: ErrorService,
        private routingRulesService: RoutingRulesService
    ) {}

    getColumnsKeys(col) {
        return col.key;
    }

    changeDelegateRuleset(delegateId: DelegateId) {
        this.dialog
            .open(ChangeDelegateRulesetDialogComponent, {
                ...ChangeDelegateRulesetDialogComponent.defaultConfig,
                data: {
                    mainRulesetRefID: delegateId.parentRefId,
                    delegateIdx: delegateId.delegateIdx,
                },
            })
            .afterClosed()
            .pipe(handleError(this.errorService.error), untilDestroyed(this))
            .subscribe();
    }

    changeTarget(delegateId: DelegateId) {
        this.dialog
            .open(ChangeTargetDialogComponent, {
                ...ChangeTargetDialogComponent.defaultConfig,
                data: {
                    mainRulesetRefID: delegateId.parentRefId,
                    delegateIdx: delegateId.delegateIdx,
                },
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe({ error: this.errorService.error });
    }

    cloneDelegateRuleset(delegateId: DelegateId) {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() =>
                    this.routingRulesService.cloneDelegateRuleset({
                        mainRulesetRefID: delegateId.parentRefId,
                        delegateIdx: delegateId.delegateIdx,
                    })
                ),
                untilDestroyed(this)
            )
            .subscribe({ error: this.errorService.error });
    }

    delete(delegateId: DelegateId) {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() =>
                    this.routingRulesService.deleteDelegate({
                        mainRulesetRefID: delegateId.parentRefId,
                        delegateIdx: delegateId.delegateIdx,
                    })
                ),
                untilDestroyed(this)
            )
            .subscribe({ error: this.errorService.error });
    }
}
