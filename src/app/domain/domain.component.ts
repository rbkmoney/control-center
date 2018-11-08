import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import { FormGroup } from '@angular/forms';

import { DomainService, Node } from './domain.service';

@Component({
    templateUrl: 'domain.component.html',
    styleUrls: ['../shared/container.css', 'domain.component.css']
})
export class DomainComponent implements OnInit {
    form: FormGroup;
    treeControl: NestedTreeControl<Node>;
    dataSource: MatTreeNestedDataSource<Node>;
    dataSourceNotModified: Node[];

    constructor(private domainService: DomainService) {
        this.treeControl = new NestedTreeControl(this.getChildren);
        this.dataSource = new MatTreeNestedDataSource();
        domainService.dataChange.subscribe(data => {
            /**
             * TODO когда нода без детей становится с детьми - автоматически разворачивается (иногда нет)
             * решено только на верхней ноде
             */
            const expanded = this.dataSourceNotModified === data
                ? data.map((item, idx) =>
                    Object.keys(item).reduce((a, i) => a && this.dataSource.data[idx][i] === item[i], true)
                    && Object.keys(this.dataSource.data[idx]).reduce((a, i) => a && this.dataSource.data[idx][i] === item[i], true)
                    && this.getChildren(this.dataSource.data[idx])
                    && this.treeControl.isExpanded(this.dataSource.data[idx]))
                : null;
            this.dataSource.data = data.map((item) => ({...item}));
            // this.form = domainService.buildForm(data);
            if (expanded) {
                expanded.forEach((isExpanded, idx) => {
                    if (isExpanded) {
                        this.treeControl.expand(this.dataSource.data[idx]);
                    }
                });
            }
            this.dataSourceNotModified = data;
        });
    }

    ngOnInit() {
        this.domainService.checkout();
    }

    getChildren(node: any) {
        return node.children;
    }

    hasNestedChild = (_: number, node: any) => {
        return !!this.getChildren(node);
    }
}
