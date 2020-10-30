import { NgModule } from '@angular/core';

import { ClaimStatusThriftPipe } from './claim-status-thrift.pipe';
import { MapUnionPipe } from './map-union.pipe';
import { ThriftInt64Pipe } from './thrift-int64.pipe';
import { ThriftViewPipe } from './thrift-view.pipe';
import { UnionKeyPipe } from './union-key';

const pipes = [ClaimStatusThriftPipe, MapUnionPipe, ThriftInt64Pipe, ThriftViewPipe, UnionKeyPipe];

@NgModule({
    declarations: pipes,
    exports: pipes,
})
export class ThriftPipesModule {}
