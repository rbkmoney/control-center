import { Component, Input, OnInit } from '@angular/core';

import { CategoryService } from '../../../../papi/category.service';
import { Category } from '../../../../thrift-services/damsel/gen-model/domain';

@Component({
    templateUrl: 'category.component.html',
    selector: 'cc-category',
    providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
    @Input() categoryID: number;
    category: Category;

    constructor(private categoryService: CategoryService) {}

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe(categories => {
            this.category = categories.find(category => category.id === this.categoryID);
        });
    }
}
