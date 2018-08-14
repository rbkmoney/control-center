import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import sortBy from 'lodash-es/sortBy';

import { CreateChangeItem } from '../create-change-item';
import { ShopModification } from '../../../backend/model';
import { CategoryService } from '../../../backend/category.service';
import { Category } from '../../../backend/model';

@Injectable()
export class CreateCategoryRefService implements CreateChangeItem {

    categories$: Subject<Category[]> = new Subject<Category[]>();

    form: FormGroup;

    constructor(private categoryService: CategoryService,
                private fb: FormBuilder) {
        this.categoryService.getCategories().subscribe((categories) => {
            this.categories$.next(sortBy(categories, 'id'));
            this.categories$.complete();
        });
        this.form = this.prepareForm();
    }

    getValue(): ShopModification {
        return {
            categoryModification: this.form.value
        };
    }

    isValid(): boolean {
        return this.form.valid;
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            id: ['', Validators.required]
        });
    }
}
