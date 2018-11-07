import { Component, OnInit } from '@angular/core';

import { DomainService } from './domain.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';

@Component({
    templateUrl: 'domain.component.html',
    styleUrls: ['../shared/container.css', 'domain.component.css']
})
export class DomainComponent implements OnInit {
    form: any;
    treeControl: NestedTreeControl<any>;
    dataSource: MatTreeNestedDataSource<any>;

    constructor(private domainService: DomainService) {
        this.treeControl = new NestedTreeControl(this.getChildren);
        this.dataSource = new MatTreeNestedDataSource();
        domainService.dataChange.subscribe(data => {
            this.dataSource.data = [data];
            this.form = domainService.buildForm(data);
        });
    }

    ngOnInit() {
        this.domainService.checkout();
    }

    getChildren(node: any) {
        if (node.fields) {
            return node.fields;
        }
        if (node.type && node.type.fields) {
            return node.type.fields;
        }
        return node.fields;
    }

    hasNestedChild = (_: number, node: any) => {
        return !!this.getChildren(node);
    }
}
