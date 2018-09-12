import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import sortBy from 'lodash-es/sortBy';

import { Category } from '../../papi/model/index';
import { CategoryService } from '../../papi/category.service';

@Component({
    selector: 'cc-category-ref',
    templateUrl: 'category-ref.component.html'
})
export class CategoryRefComponent implements OnInit {

    @Input()
    form: FormGroup;

    categories$: Observable<Category[]>;

    constructor(private categoryService: CategoryService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.addControl('id', this.fb.control('', Validators.required));

        this.categories$ = this.categoryService
            .getCategories()
            .pipe(map((categories) => sortBy(categories, 'id')));
    }
}
