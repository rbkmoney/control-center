import { NgModule } from '@angular/core';

import { ThriftEncodePipe } from './thrift-encode.pipe';

@NgModule({
    declarations: [
        ThriftEncodePipe
    ],
    exports: [
        ThriftEncodePipe
    ]
})
export class SharedModule {}
