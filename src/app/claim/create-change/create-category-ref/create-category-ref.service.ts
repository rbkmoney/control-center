import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CreateChangeItem } from '../create-change-item';
import { ShopModification } from '../../../damsel';
import { CategoryService } from '../../../papi/category.service';

@Injectable()
export class CreateCategoryRefService implements CreateChangeItem {

    form: FormGroup;

    constructor(private categoryService: CategoryService,
                private fb: FormBuilder) {
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
