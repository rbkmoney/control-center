import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

import { PartyID, ShopID } from '../../../../../thrift-services/damsel/gen-model/domain';
import { TerminalFromShopParams } from '../../../../../thrift-services/damsel/operations/terminal-from-shop-params';
import { ProviderID } from '../../../../../thrift-services/fistful/gen-model/provider';
import { PredicateType } from '../../extract-terminal-info';
import { TerminalInfo } from '../../provider-info';
import { EditTerminalDecisionPriorityComponent } from './edit-terminal-decision/edit-terminal-decision-priority';
import { EditTerminalDecisionWeightComponent } from './edit-terminal-decision/edit-terminal-decision-weight';
import { RemoveTerminalDecisionService } from './remove-terminal-decision.service';

export enum TerminalEditAction {
    editWeight = 'editWeight',
    editPriority = 'editPriority',
    removeTerminal = 'removeTerminal',
}

@Component({
    selector: 'cc-terminal-infos-table',
    templateUrl: 'terminal-infos-table.component.html',
    styleUrls: ['terminal-infos-table.component.scss'],
    providers: [RemoveTerminalDecisionService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalInfosTableComponent {
    @Input()
    terminalInfos: TerminalInfo[];

    @Input()
    shopID: ShopID;

    @Input()
    partyID: PartyID;

    @Input()
    providerID: ProviderID;

    @Output()
    terminalChanged: EventEmitter<void> = new EventEmitter();

    terminalEditAction = TerminalEditAction;
    displayedColumns = ['name', 'description', 'type', 'priority', 'weight', 'status', 'actions'];
    terminalRemoved$ = this.removeTerminalDecision.terminalRemoved$;

    constructor(
        private dialog: MatDialog,
        private removeTerminalDecision: RemoveTerminalDecisionService
    ) {
        this.terminalRemoved$.subscribe(() => this.terminalChanged.emit());
    }

    canEdit(predicate: PredicateType) {
        return predicate === PredicateType.condition;
    }

    canRemove(predicateType: PredicateType) {
        return predicateType === PredicateType.condition || predicateType === PredicateType.any_of;
    }

    action(terminalID: number, action: TerminalEditAction) {
        const data = {
            shopID: this.shopID,
            partyID: this.partyID,
            providerID: this.providerID,
            terminalID,
        } as TerminalFromShopParams;
        const config = {
            data,
            width: '300px',
            disableClose: true,
        };
        let dialog;
        switch (action) {
            case TerminalEditAction.editPriority:
                dialog = this.dialog.open(EditTerminalDecisionPriorityComponent, config);
                break;
            case TerminalEditAction.editWeight:
                dialog = this.dialog.open(EditTerminalDecisionWeightComponent, config);
                break;
            case TerminalEditAction.removeTerminal:
                this.removeTerminalDecision.removeTerminal(data);
                break;
        }
        dialog
            .afterClosed()
            .pipe(filter((result) => !!result))
            .subscribe(() => this.terminalChanged.emit());
    }
}
