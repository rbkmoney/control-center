import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DominantCacheService } from '@cc/app/api/dominant-cache';

import { Category } from '../../../../../thrift-services/damsel/gen-model/domain';

@Component({
    templateUrl: 'category.component.html',
    selector: 'cc-category',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
    @Input() set category(categoryID: number) {
        this.categoryID = categoryID;
        this.category$ = this.dominantCacheService
            .getCategories()
            .pipe(
                map((categories) =>
                    categories.find((category) => category.ref === String(categoryID))
                )
            );
    }

    category$: Observable<Category>;
    categoryID: number;

    constructor(private dominantCacheService: DominantCacheService) {}
}
