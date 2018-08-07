import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClaimsComponent } from './claims.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'claims',
                component: ClaimsComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ClaimsRoutingModule {}
