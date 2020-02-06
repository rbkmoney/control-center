import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { PartyModification } from '../../../thrift-services/damsel/gen-model/payment_processing';

@Component({
    selector: 'cc-unsaved-party-modifications',
    templateUrl: 'unsaved-party-modifications.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnsavedPartyModificationsComponent {
    @Input() partyModifications: Observable<PartyModification[]>;
    @Output() save: EventEmitter<void> = new EventEmitter();
    @Output() remove: EventEmitter<number> = new EventEmitter();

    onSave() {
        this.save.emit();
    }

    onRemove(position: number) {
        this.remove.emit(position);
    }
}
