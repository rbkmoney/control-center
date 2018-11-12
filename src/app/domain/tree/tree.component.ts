import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import { FormGroup } from '@angular/forms';
import union from 'lodash-es/union';

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
    treeControl: NestedTreeControl<Node>;
    dataSource: MatTreeNestedDataSource<Node>;

    constructor(private treeService: TreeService) {
        this.treeControl = new NestedTreeControl(this.getChildren);
        this.dataSource = new MatTreeNestedDataSource();
        this.treeService.dataChanges.subscribe((data) => {
            this.updateData(data);
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data.previousValue !== changes.data.currentValue || changes.metadata.previousValue !== changes.metadata.currentValue) {
            const data = changes.data.currentValue;
            const metadata = changes.metadata.currentValue;
            console.time('buildViewModel');
            const viewModel = this.treeService.buildViewModel(metadata, {val: data});
            console.timeEnd('buildViewModel');
            console.dir(viewModel);
            this.treeService.updateData([viewModel]);
        }
    }

    updateData(data: Node[]) {
        /**
         * TODO когда нода без детей становится с детьми - автоматически разворачивается (иногда нет)
         * решено только на верхней ноде
         */
        const expanded = [];
        for (let i = 0, isExpanded = false; i < data.length; ++i, isExpanded = false) {
            for (let j = 0; j < this.dataSource.data.length; ++j) {
                if (this.isEqual(data[i], this.dataSource.data[j])) {
                    isExpanded = true;
                    break;
                }
            }
            expanded.push(isExpanded);
        }
        this.dataSource.data = data.map((item) => ({...item}));
        // this.form = domainService.buildForm(data);
        for (const [idx, isExpanded] of Object.entries(expanded)) {
            if (isExpanded) {
                this.treeControl.expand(this.dataSource.data[idx]);
            }
        }
    }

    isEqual(obj0, obj1): boolean {
        if (obj0 === obj1) {
            return true;
        }
        const keys = union(Object.keys(obj0), Object.keys(obj1));
        for (const key of keys) {
            if (obj0[key] !== obj1[key]) {
                return false;
            }
        }
        return true;
    }

    getChildren(node: any) {
        return node.children;
    }

    hasNestedChild = (_: number, node: any) => {
        return !!this.getChildren(node);
    }
}
