import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { Category } from '../../../backend/model/category';
import { CreateCategoryRefService } from './create-category-ref.service';

@Component({
    selector: 'cc-create-category-ref',
    templateUrl: 'create-category-ref.component.html'
})
export class CreateCategoryRefComponent implements OnInit {

    categories$: Observable<Category[]>;

    form: FormGroup;

    constructor(private createCategoryService: CreateCategoryRefService) {
    }

    ngOnInit() {
        const {categories$, form} = this.createCategoryService;
        this.form = form;
        this.categories$ = categories$;
    }
}
