import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { DomainService, DomainNode, DomainLeafNode } from './domain.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';

@Component({
    templateUrl: 'domain.component.html',
    styleUrls: ['../shared/container.css', 'domain.component.css']
})
export class DomainComponent implements OnInit {
    form: any;
    treeControl: NestedTreeControl<DomainNode | DomainLeafNode> = new NestedTreeControl((node: DomainNode) => node.children);
    dataSource: MatTreeNestedDataSource<DomainNode> = new MatTreeNestedDataSource();

    constructor(private domainService: DomainService, private fb: FormBuilder) {
        domainService.dataChange.subscribe(data => this.dataSource.data = data);
    }

    ngOnInit() {
        this.domainService.checkout();
    }

    hasNestedChild = (_: number, nodeData: DomainNode) => !!nodeData.children;
}
