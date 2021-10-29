import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import isNil from 'lodash-es/isNil';
import sortBy from 'lodash-es/sortBy';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/internal/operators';

import { DominantCacheService } from '@cc/app/api/dominant-cache';
import { Category } from '@cc/app/api/dominant-cache/gen-model/dominant_cache';

import { CategoryRef } from '../../../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-category-ref',
    templateUrl: 'category-ref.component.html',
})
export class CategoryRefComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() required: boolean;
    @Input() initialValue: CategoryRef;

    categories$: Observable<Category[]>;
    isLoading = true;

    constructor(
        private dominantCacheService: DominantCacheService,
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        const category = this.initialValue?.id;
        this.form.registerControl(
            'id',
            this.fb.control(
                {
                    value: category,
                    disabled: isNil(category),
                },
                this.required ? Validators.required : null
            )
        );
        this.categories$ = this.dominantCacheService.getCategories().pipe(
            map((categories) => sortBy(categories, 'ref')),
            tap(
                () => {
                    this.form.controls.id.enable();
                    this.isLoading = false;
                },
                () => {
                    this.isLoading = false;
                    this.snackBar.open('An error occurred while shop category receiving', 'OK');
                }
            )
        );
        this.form.updateValueAndValidity();
    }
}
