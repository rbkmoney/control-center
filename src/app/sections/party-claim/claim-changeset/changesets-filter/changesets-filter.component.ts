import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ChangesetInfo, ChangesetInfoType } from '../changeset-infos';
import { ChangesetsFilterService } from './changesets-filter.service';

@Component({
    selector: 'cc-changesets-filter',
    templateUrl: 'changesets-filter.component.html',
    styleUrls: ['changesets-filter.component.scss'],
    providers: [ChangesetsFilterService],
})
export class ChangesetsFilterComponent implements OnInit {
    @Input()
    set changesetInfos(v: ChangesetInfo[]) {
        this.changesetsFilterService.setChangesetInfos(v);
    }

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
}
