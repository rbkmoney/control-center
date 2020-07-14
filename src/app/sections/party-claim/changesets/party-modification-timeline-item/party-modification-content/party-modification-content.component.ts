import { Component, Input } from '@angular/core';

@Component({
    selector: 'cc-party-modification-content',
    templateUrl: 'party-modification-content.component.html',
})
export class PartyModificationContentComponent {
    @Input()
    expanded = false;

    testMod = {
        shop_modification: {
            id: '6d3fd2b0-7ef6-4607-a73f-112ef27e25cb',
            modification: { category_modification: { id: 100 } },
        },
    };
}
