import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import sortBy from 'lodash-es/sortBy';

import { Category } from '../../../papi/model';
import { CategoryService } from '../../../papi/category.service';

@Component({
    selector: 'cc-category-ref',
    templateUrl: 'category-ref.component.html'
})
export class CategoryRefComponent implements OnInit {

    @Input()
    form: FormGroup;

    @Input()
    required: boolean;

    categories$: Observable<Category[]>;

    constructor(private categoryService: CategoryService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.registerControl('id', this.fb.control('', this.required ? Validators.required : null));

        this.categories$ = this.categoryService
            .getCategories()
            .pipe(map((categories) => sortBy(categories, 'id')));
    }
}
