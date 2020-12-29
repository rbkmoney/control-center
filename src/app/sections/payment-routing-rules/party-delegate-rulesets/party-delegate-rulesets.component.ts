import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, ReplaySubject } from 'rxjs';
import { filter, first, map, shareReplay, startWith, switchMap, take } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@cc/components/confirm-action-dialog';

import { handleError } from '../../../../utils/operators/handle-error';
import { ErrorService } from '../../../shared/services/error';
import { PaymentRoutingRulesService } from '../../../thrift-services';
import { DomainCacheService } from '../../../thrift-services/damsel/domain-cache.service';
import { ChangeTargetDialogComponent } from '../change-target-dialog';
import { AttachNewRulesetDialogComponent } from './attach-new-ruleset-dialog';
import { PartyDelegateRulesetsService } from './party-delegate-rulesets.service';

@UntilDestroy()
@Component({
    selector: 'cc-party-delegate-rulesets',
    templateUrl: 'party-delegate-rulesets.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PartyDelegateRulesetsService],
})
export class PartyDelegateRulesetsComponent {
    displayedColumns = ['paymentInstitution', 'mainRuleset', 'partyDelegate', 'actions'];
    isLoading$ = this.domainService.isLoading$;

    @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
        this.paginator$.next(paginator);
    }
    paginator$ = new ReplaySubject<MatPaginator>(1);
    dataSource$ = combineLatest([
        this.partyDelegateRulesetsService.partyDelegateRulesets$,
        this.paginator$.pipe(startWith<any, null>(null)),
    ]).pipe(
        map(([v, paginator]) => {
            const data = new MatTableDataSource(v);
            data.paginator = paginator;
            return data;
        }),
        shareReplay(1)
    );

    constructor(
        private partyDelegateRulesetsService: PartyDelegateRulesetsService,
        private paymentRoutingRulesService: PaymentRoutingRulesService,
        private router: Router,
        private dialog: MatDialog,
        private domainService: DomainCacheService,
        private errorService: ErrorService
    ) {}

    attachNewRuleset() {
        this.partyDelegateRulesetsService.partyID$
            .pipe(
                take(1),
                switchMap((partyID) =>
                    this.dialog
                        .open(AttachNewRulesetDialogComponent, {
                            ...AttachNewRulesetDialogComponent.defaultConfig,
                            data: { partyID },
                        })
                        .afterClosed()
                ),
                handleError(this.errorService.error),
                untilDestroyed(this)
            )
            .subscribe();
    }

    navigateToPartyRuleset(id: string) {
        this.partyDelegateRulesetsService.partyID$
            .pipe(first(), untilDestroyed(this))
            .subscribe((partyID) =>
                this.router.navigate(['party', partyID, 'payment-routing-rules', id])
            );
    }

    changeTarget(mainRulesetRefID: string, rulesetID: string) {
        this.dialog
            .open(ChangeTargetDialogComponent, {
                ...ChangeTargetDialogComponent.defaultConfig,
                data: { mainRulesetRefID, rulesetID },
            })
            .afterClosed()
            .pipe(handleError(this.errorService.error), untilDestroyed(this))
            .subscribe();
    }

    deleteRuleset(mainRulesetRefID: number, rulesetRefID: number) {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() =>
                    this.paymentRoutingRulesService.deleteDelegate({
                        mainRulesetRefID,
                        rulesetRefID,
                    })
                ),
                handleError(this.errorService.error),
                untilDestroyed(this)
            )
            .subscribe();
    }
}
