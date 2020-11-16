import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

import { PredicateType } from '../../../../../party/shop-details/extract-terminal-info';
import { PartyID, ShopID } from '../../../../../thrift-services/damsel/gen-model/domain';
import { ProviderID } from '../../../../../thrift-services/fistful/gen-model/provider';
import { TerminalInfo } from '../../provider-info';
import {
    EditTerminalDecisionPriorityComponent,
    EditTerminalDecisionPriorityService,
} from './edit-terminal-decision';
import { EditTerminalDecisionWeightComponent } from './edit-terminal-decision/edit-terminal-decision-weight';

@Component({
    selector: 'cc-terminal-infos-table',
    templateUrl: 'terminal-infos-table.component.html',
    styleUrls: ['terminal-infos-table.component.scss'],
    providers: [EditTerminalDecisionPriorityService],
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

    displayedColumns = ['name', 'description', 'type', 'priority', 'weight', 'status', 'actions'];

    constructor(
        private dialog: MatDialog,
        private editPriorityService: EditTerminalDecisionPriorityService
    ) {}

    isWeightOrPriorityEditable(predicate: PredicateType) {
        return predicate === PredicateType.condition;
    }

    isEditable(predicateType: PredicateType) {
        return predicateType === PredicateType.condition || predicateType === PredicateType.any_of;
    }

    editPriority(terminalID: number) {
        const config = {
            data: this.getModalData(terminalID),
            width: '300px',
            disableClose: true,
        };
        const dialog = this.dialog.open(EditTerminalDecisionPriorityComponent, config);
        dialog
            .afterClosed()
            .pipe(filter((result) => result))
            .subscribe(() => {
                this.terminalChanged.emit();
            });
    }

    editWeight(terminalID: number) {
        const config = {
            data: this.getModalData(terminalID),
            width: '300px',
            disableClose: true,
        };
        const dialog = this.dialog.open(EditTerminalDecisionWeightComponent, config);
        dialog
            .afterClosed()
            .pipe(filter((result) => result))
            .subscribe(() => {
                this.terminalChanged.emit();
            });
    }

    changePriority(op: string, i: number) {
        const terminalID = this.terminalInfos[i].terminal.ref.id;
        const basePriority = this.terminalInfos[i].priority.toNumber();
        const prevInfo = this.terminalInfos[i - 1];
        const nexInfo = this.terminalInfos[i + 1];

        let diffPlus50;
        if (op === 'plus') {
            diffPlus50 = prevInfo ? prevInfo.priority.toNumber() + 50 : basePriority + 50;
            this.editPriorityService.edit(this.getModalData(terminalID), {
                property: 'priority',
                value: diffPlus50,
            });
        } else if (op === 'minus') {
            diffPlus50 = nexInfo ? nexInfo.priority.toNumber() - 50 : 0;
            this.editPriorityService.edit(this.getModalData(terminalID), {
                property: 'priority',
                value: diffPlus50,
            });
        }
    }

    private getModalData(terminalID: number) {
        return {
            shopID: this.shopID,
            partyID: this.partyID,
            providerID: this.providerID,
            terminalID,
        };
    }
}
