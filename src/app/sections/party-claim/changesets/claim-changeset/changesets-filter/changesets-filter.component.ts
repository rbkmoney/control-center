import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';

import { ChangesetInfo, ChangesetInfoType } from '../changeset-infos';
import { ChangesetsFilterService } from './changesets-filter.service';

@Component({
    selector: 'cc-changesets-filter',
    templateUrl: 'changesets-filter.component.html',
    providers: [ChangesetsFilterService],
})
export class ChangesetsFilterComponent implements OnInit, OnChanges {
    @Input()
    changesetInfos: ChangesetInfo[];

    @Output()
    filterChange: EventEmitter<ChangesetInfo[]> = new EventEmitter();

    changesetsFilterForm = this.changesetsFilterService.changesetsFilterForm;
    changesetInfoType = ChangesetInfoType;

    constructor(private changesetsFilterService: ChangesetsFilterService) {}

    ngOnInit(): void {
        this.changesetsFilterService.filteredChangesetInfos$.subscribe((infos) => {
            this.filterChange.emit(infos);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { changesetInfos } = changes;
        if (changesetInfos.currentValue) {
            this.changesetsFilterService.setChangesetInfos(changesetInfos.currentValue);
        }
    }
}
