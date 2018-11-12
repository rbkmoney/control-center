import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Node } from './node';
import { Type2 } from '../../metadata/metadata.service';
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
    metadata: Type2;

    form: FormGroup;
    dataSource: Node;

    constructor(private treeService: TreeService) {
        this.treeService.dataChanges.subscribe((data) => {
            this.updateData(data);
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data.previousValue !== changes.data.currentValue || changes.metadata.previousValue !== changes.metadata.currentValue) {
            const data = changes.data.currentValue;
            const metadata = changes.metadata.currentValue;
            console.time('buildViewModel');
            this.dataSource = this.treeService.buildViewModel(metadata, {val: data});
            console.timeEnd('buildViewModel');
            console.dir(this.dataSource);
        }
    }

    updateData(data: Node) {
        this.dataSource = data;
    }
}
