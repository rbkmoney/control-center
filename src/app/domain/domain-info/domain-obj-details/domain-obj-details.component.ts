import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DomainDetailsService } from '../domain-details.service';
import { IEditorOptions, MonacoFile } from '../../../monaco-editor';

@Component({
    selector: 'cc-domain-obj-details',
    templateUrl: './domain-obj-details.component.html',
    styleUrls: ['./domain-obj-details.component.scss']
})
export class DomainObjDetailsComponent implements OnInit {
    file$: Observable<MonacoFile>;
    options: IEditorOptions = {
        readOnly: true
    };

    constructor(private detailsService: DomainDetailsService) {}

    ngOnInit() {
        this.file$ = this.detailsService.domainPair$.pipe(
            map(({ object }) => ({
                uri: 'index.json',
                language: 'json',
                content: JSON.stringify(object, null, 2)
            }))
        );
    }
}
