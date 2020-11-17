import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategoryService } from '../../../../papi/category.service';
import { Category } from '../../../../thrift-services/damsel/gen-model/domain';

@Component({
    templateUrl: 'category.component.html',
    selector: 'cc-category',
    providers: [CategoryService],
})
export class CategoryComponent {
    @Input() set category(categoryID: number) {
        this.categoryID = categoryID;
        this.category$ = this.categoryService.categories$.pipe(
            map((categories) => categories.find((category) => category.id === categoryID))
        );
    }

    category$: Observable<Category>;
    categoryID: number;

    constructor(private categoryService: CategoryService) {}
}
