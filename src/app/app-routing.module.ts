import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppAuthGuardService } from './app-auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/claims',
                pathMatch: 'full'
            }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AppAuthGuardService
    ]
})
export class AppRoutingModule {}
