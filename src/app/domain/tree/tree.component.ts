import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Node } from './node';
import { Type } from '../../metadata/metadata.service';
import { TreeService } from './tree.service';

@Component({
    selector: 'cc-tree',
    templateUrl: 'tree.component.html',
    styleUrls: ['tree.component.css']
})
export class TreeComponent implements OnChanges {
    @Input()
    data: any;
    @Input()
    metadata: Type;

    form: FormGroup;
    model: Node;

    constructor(private treeService: TreeService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data.previousValue !== changes.data.currentValue || changes.metadata.previousValue !== changes.metadata.currentValue) {
            const data = changes.data.currentValue;
            const metadata = changes.metadata.currentValue;
            console.time('buildViewModel');
            this.model = Node.fromType(metadata, {val: data, parent: undefined});
            console.timeEnd('buildViewModel');
            console.dir(this.model);
        }
    }
}
