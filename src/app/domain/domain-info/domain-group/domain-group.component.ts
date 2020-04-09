import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs/operators';

import { DomainGroup } from './domain-group';
import { DomainGroupService } from './domain-group.service';

@Component({
    selector: 'cc-domain-group',
    templateUrl: './domain-group.component.html',
    providers: [DomainGroupService],
})
export class DomainGroupComponent implements OnInit {
    group: DomainGroup[];
    version: number;

    constructor(private groupService: DomainGroupService, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.groupService.initialize().subscribe(({ group, version }) => {
            this.group = group;
            this.version = version;
        });
        this.groupService.undefDetectionStatus$
            .pipe(filter((s) => s === 'detected'))
            .subscribe(() =>
                this.snackBar.open(
                    'Detected undefined domain types. Need to bump damsel version.',
                    'OK'
                )
            );
    }
}
