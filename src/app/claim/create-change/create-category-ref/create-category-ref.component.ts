import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import sortBy from 'lodash-es/sortBy';

import { Category } from '../../../papi/model';
import { CreateCategoryRefService } from './create-category-ref.service';
import { CategoryService } from '../../../papi/category.service';

@Component({
    selector: 'cc-create-category-ref',
    templateUrl: 'create-category-ref.component.html'
})
export class CreateCategoryRefComponent implements OnInit {

    categories$: Observable<Category[]>;

    form: FormGroup;

    constructor(
        private createCategoryService: CreateCategoryRefService,
        private categoryService: CategoryService) {}

    ngOnInit() {
        this.form = this.createCategoryService.form;
        this.categories$ = this.categoryService
            .getCategories()
            .pipe(map((categories) => sortBy(categories, 'id')));
    }
}
