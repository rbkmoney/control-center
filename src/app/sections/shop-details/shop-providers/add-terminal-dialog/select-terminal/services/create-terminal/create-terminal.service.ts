import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { combineLatest, merge, Observable, of, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { DomainCacheService } from '../../../../../../../thrift-services/damsel/domain-cache.service';
import {
    getCreateTerminalCommit,
    TerminalOption,
} from '../../../../../../../thrift-services/damsel/operations';

const toFormArray = (fb: FormBuilder, options: TerminalOption[]): FormArray =>
    fb.array(options.map((option) => fb.group(option)));

@Injectable()
export class CreateTerminalService {
    private save$ = new Subject();
    error$ = new Subject();
    // createTerminal(params: CreateTerminalParams): Observable<number> {
    //     let newTerminalID = null;
    //     return this.domainCacheService.getObjects('terminal').pipe(
    //         take(1),
    //         switchMap((terminalObjects) => {
    //             const { commit, id } = getCreateTerminalCommit(terminalObjects, params);
    //             newTerminalID = id;
    //             return this.domainCacheService.commit(commit);
    //         }),
    //         map(() => newTerminalID)
    //     );
    // }

    saved$: Observable<number> = this.save$.pipe(
        switchMap(() => this.domainCacheService.getObjects('terminal')),
        switchMap((terminalObject) => {
            const { id, commit } = getCreateTerminalCommit(terminalObject, this.form.value);
            return combineLatest([of(id), this.domainCacheService.commit(commit)]);
        }),
        map(([id]) => id)
    );

    inProgress$ = progress(this.save$, merge(this.saved$, this.error$));

    form = this.prepareTerminalForm();

    constructor(private fb: FormBuilder, private domainCacheService: DomainCacheService) {
        this.saved$.subscribe();
    }

    addOption() {
        (this.form.controls.options as FormArray).push(this.getOption());
    }

    removeOption(index: number) {
        const options = this.form.controls.options as FormArray;
        if (options.length > 1) {
            options.removeAt(index);
        }
    }

    save() {
        this.save$.next();
    }

    private getOption(): FormGroup {
        return this.fb.group({
            key: '',
            value: '',
        });
    }

    private prepareTerminalForm(): FormGroup {
        return this.fb.group({
            terminalName: ['', Validators.required],
            terminalDescription: ['', Validators.required],
            riskCoverage: ['', Validators.required],
            options: toFormArray(this.fb, [{ key: '', value: '' }]),
        });
    }
}
