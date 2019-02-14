import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';

import { Reference } from '../../gen-damsel/domain';
import {
    IEditorOptions,
    MonacoFile,
    CodeLensProvider,
    CompletionProvider
} from '../../monaco-editor/model';
import { DomainObjModificationService } from './domain-obj-modification.service';
import { DomainObjCodeLensProvider } from './domain-obj-code-lens-provider';
import { DomainObjCompletionProvider } from './domain-obj-completion-provider';
import { MetadataService } from '../metadata.service';
import { build } from '../../damsel-meta/meta-builder';
import { DefinitionService } from '../../damsel-meta/definition.service';
import { ASTDefinition } from '../../damsel-meta/model/ast-definition';

@Component({
    templateUrl: './domain-obj-modification.component.html',
    styleUrls: ['../../shared/container.css', 'domain-obj-modification.component.scss'],
    providers: [DomainObjModificationService]
})
export class DomainObjModificationComponent implements OnInit {
    initialized = false;
    isLoading: boolean;

    file: MonacoFile;
    options: IEditorOptions = {
        readOnly: false
    };
    objectType: string;
    valid = false;
    codeLensProviders: CodeLensProvider[];
    completionProviders: CompletionProvider[];

    astDifinition: ASTDefinition[];

    constructor(
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private domainObjModificationService: DomainObjModificationService,
        private definitionService: DefinitionService
    ) {}

    ngOnInit() {
        this.route.params
            .pipe(map(({ ref }) => JSON.parse(ref)))
            .subscribe(
                ref => this.initialize(ref),
                () => this.snackBar.open('Malformed domain object ref', 'OK')
            );
        this.codeLensProviders = [new DomainObjCodeLensProvider()];
        this.completionProviders = [new DomainObjCompletionProvider()];

        this.definitionService.astDefinition.subscribe(d => {
            console.log(d);
            this.astDifinition = d;
        });
    }

    fileChange({ content }: MonacoFile) {
        const meta = build(content, this.astDifinition, this.objectType);
        console.log('Builded', meta);
    }

    private initialize(ref: Reference) {
        this.isLoading = true;
        this.domainObjModificationService.initialize(ref).subscribe(
            ({ file, objectType }) => {
                this.isLoading = false;
                this.initialized = true;
                if (!file) {
                    this.snackBar.open('Domain object not found', 'OK');
                }
                this.file = file;
                if (!objectType) {
                    this.snackBar.open('Domain object type not found', 'OK');
                }
                this.objectType = objectType;
            },
            err => {
                this.isLoading = false;
                this.snackBar
                    .open(`An error occurred while initializing: ${err}`, 'RETRY')
                    .onAction()
                    .subscribe(() => this.initialize(ref));
            }
        );
    }
}
