import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    OnInit
} from '@angular/core';
import isEqual from 'lodash-es/isEqual';

import { PartyModification } from '../../../thrift-services/damsel/gen-model/payment_processing';
import { UnsavedPartyModificationService } from './unsaved-party-modifications.service';

@Component({
    selector: 'cc-unsaved-party-modifications',
    templateUrl: 'unsaved-party-modifications.component.html',
    providers: [UnsavedPartyModificationService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnsavedPartyModificationsComponent implements OnChanges, OnInit {
    @Input() partyModifications: PartyModification[];
    @Output() partyModificationsChanged: EventEmitter<PartyModification[]> = new EventEmitter();

    unsavedPartyModifications$ = this.unsavedPartyModService.unsavedPartyModifications$;

    constructor(private unsavedPartyModService: UnsavedPartyModificationService) {}

    ngOnInit() {
        this.unsavedPartyModifications$.subscribe(m => this.partyModificationsChanged.emit(m));
    }

    ngOnChanges({ partyModifications }: SimpleChanges) {
        if (
            partyModifications &&
            !isEqual(partyModifications.previousValue, partyModifications.currentValue)
        ) {
            this.unsavedPartyModService.setUpUnsaved(partyModifications.currentValue);
        }
    }

    remove(pos: number) {
        this.unsavedPartyModService.remove(pos);
    }
}
