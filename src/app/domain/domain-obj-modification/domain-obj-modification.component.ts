import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import {
    IEditorOptions,
    MonacoFile,
    CodeLensProvider,
    CompletionProvider
} from '../../monaco-editor/model';
import { DomainObjModificationService } from './domain-obj-modification.service';
import { DomainObjCodeLensProvider } from './domain-obj-code-lens-provider';
import { DomainObjCompletionProvider } from './domain-obj-completion-provider';
import { ASTDefinition } from '../../damsel-meta/model/ast-definition';

@Component({
    templateUrl: './domain-obj-modification.component.html',
    styleUrls: ['domain-obj-modification.component.scss'],
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

    constructor(
        private snackBar: MatSnackBar,
        private domainObjModificationService: DomainObjModificationService
    ) {}

    ngOnInit() {
        this.initialize();
        this.codeLensProviders = [new DomainObjCodeLensProvider()];
        this.completionProviders = [new DomainObjCompletionProvider()];
    }

    fileChange({ content }: MonacoFile) {
        const meta = this.domainObjModificationService.applyValue(content);
        console.log('BUILDED', meta);
    }

    private initialize() {
        this.isLoading = true;
        this.domainObjModificationService.initialize().subscribe(
            ({ file, objectType }) => {
                this.isLoading = false;
                this.file = file;
                this.objectType = objectType;
                this.initialized = true;
            },
            err => {
                this.isLoading = false;
                this.snackBar
                    .open(`An error occurred while initializing: ${err}`, 'RETRY')
                    .onAction()
                    .subscribe(() => this.initialize());
            }
        );
    }
}
