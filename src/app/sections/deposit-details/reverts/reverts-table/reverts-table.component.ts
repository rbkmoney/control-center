import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RevertState } from '../../../../thrift-services/fistful/gen-model/deposit_revert';

@Component({
    selector: 'cc-reverts-table',
    templateUrl: 'reverts-table.component.html',
    styleUrls: ['reverts-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevertsTableComponent {
    @Input()
    reverts: RevertState[];

    displayedColumns = ['id', 'status', 'amount', 'createdAt'];
}
