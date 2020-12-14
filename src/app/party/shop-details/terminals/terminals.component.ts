import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs/operators';

import { DomainTypedManager } from '../../../thrift-services';
import { PartyID, ShopID } from '../../../thrift-services/damsel/gen-model/domain';
import { TerminalID } from '../../../thrift-services/fistful/gen-model/fistful';
import { ProviderID } from '../../../thrift-services/fistful/gen-model/provider';
import { EditTerminalDecisionPriorityComponent } from '../edit-terminal-decision/edit-terminal-decision-priority/edit-terminal-decision-priority.component';
import { EditTerminalDecisionPriorityService } from '../edit-terminal-decision/edit-terminal-decision-priority/edit-terminal-decision-priority.service';
import { EditTerminalDecisionWeightComponent } from '../edit-terminal-decision/edit-terminal-decision-weight/edit-terminal-decision-weight.component';
import { PredicateType, TerminalInfo } from '../extract-terminal-info';

@Component({
    selector: 'cc-terminals',
    templateUrl: 'terminals.component.html',
    providers: [EditTerminalDecisionPriorityService],
})
export class TerminalsComponent implements OnChanges, OnInit {
    @Input() terminalInfos: TerminalInfo[];
    @Input() partyID: PartyID;
    @Input() shopID: ShopID;
    @Input() providerID: ProviderID;
    @Output() terminalChanged: EventEmitter<void> = new EventEmitter();

    columns = ['name', 'description', 'type', 'priority', 'weight', 'status', 'actions'];
    isLoading;
    infos: TerminalInfo[];

    constructor(
        private dtm: DomainTypedManager,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private editPriorityService: EditTerminalDecisionPriorityService
    ) {}

    ngOnInit(): void {
        this.editPriorityService.terminalChanged.subscribe(() => {
            this.terminalChanged.emit();
        });
        this.isLoading = this.editPriorityService.isLoading$;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.infos = this.sortInfos(changes.terminalInfos.currentValue);
    }

    isEditable(predicateType: PredicateType, isLoading: boolean) {
        return (
            (predicateType === PredicateType.condition || predicateType === PredicateType.any_of) &&
            !isLoading
        );
    }

    removeTerminal(terminalID: TerminalID) {
        this.isLoading = true;
        const params = this.getModalData(terminalID);
        this.dtm.removeTerminalFromShop(params).subscribe(
            () => {
                this.isLoading = false;
                this.snackBar.open('Terminal successfully removed from shop', 'OK', {
                    duration: 3000,
                });
                this.terminalChanged.emit();
            },
            (e) => {
                this.isLoading = false;
                this.snackBar.open(
                    'An error occurred while while removing terminal from shop',
                    'OK'
                );
                console.error(e);
            }
        );
    }

    editPriority(terminalID: TerminalID) {
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

    editWeight(terminalID: TerminalID) {
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
        const terminalID = this.infos[i].terminal.ref.id;
        const basePriority = this.infos[i].priority;
        const prevInfo = this.infos[i - 1];
        const nexInfo = this.infos[i + 1];

        let diffPlus50;
        if (op === 'plus') {
            diffPlus50 = prevInfo ? prevInfo.priority + 50 : basePriority + 50;
            this.editPriorityService.edit(this.getModalData(terminalID), {
                property: 'priority',
                value: diffPlus50,
            });
        } else if (op === 'minus') {
            diffPlus50 = nexInfo ? nexInfo.priority - 50 : 0;
            this.editPriorityService.edit(this.getModalData(terminalID), {
                property: 'priority',
                value: diffPlus50,
            });
        }
    }

    isWeightOrPriorityEditable(predicate: PredicateType): boolean {
        return predicate === PredicateType.condition;
    }

    private getModalData(terminalID: TerminalID) {
        return {
            shopID: this.shopID,
            partyID: this.partyID,
            providerID: this.providerID,
            terminalID,
        };
    }

    private sortInfos(infos: TerminalInfo[]): TerminalInfo[] {
        return infos.sort((a, b) => {
            const aPriority = a.priority;
            const bPriority = b.priority;
            if (aPriority !== bPriority) {
                return bPriority - aPriority;
            } else {
                return b.weight - a.weight;
            }
        });
    }
}
