import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/internal/operators';
import sortBy from 'lodash-es/sortBy';
import { get } from 'lodash-es';
import { Category } from '../../../../../../papi/model';
import { CategoryRef } from '../../../../../../thrift-services/damsel/gen-model/domain';
import { CategoryService } from '../../../../../../papi/category.service';

@Component({
    selector: 'cc-category-ref',
    templateUrl: 'category-ref.component.html'
})
export class CategoryRefComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    required: boolean;

    @Input()
    initialValue: CategoryRef;

    categories$: Observable<Category[]>;

    isLoading = true;

    constructor(
        private categoryService: CategoryService,
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        const category = get(this, 'initialValue.id', '');
        this.form.registerControl(
            'id',
            this.fb.control(
                {
                    value: category,
                    disabled: category.length === 0
                },
                this.required ? Validators.required : null
            )
        );
        this.categories$ = this.categoryService.getCategories().pipe(
            map(categories => sortBy(categories, 'id')),
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
