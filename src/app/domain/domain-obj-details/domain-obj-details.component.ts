import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DomainDetailsService } from '../domain-details.service';
import { MonacoFile, MonacoEditorOptions } from '../../monaco-editor';

@Component({
    selector: 'cc-domain-obj-details',
    templateUrl: './domain-obj-details.component.html',
    styleUrls: ['./domain-obj-details.component.scss']
})
export class DomainObjDetailsComponent implements OnInit {
    file$: Observable<MonacoFile>;
    options: MonacoEditorOptions = {
        readOnly: true
    };

    constructor(private detailsService: DomainDetailsService) {}

    ngOnInit() {
        this.file$ = this.detailsService.detailedObject$.pipe(
            map(o => ({
                uri: 'index.json',
                language: 'json',
                content: JSON.stringify(o, null, 2)
            }))
        );
    }
}
