import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FacadeComponent } from './facade/facade.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './login/login.component';
import { WalletComponent } from './wallet/wallet.component';
import { BlocksComponent } from './blocks/blocks.component';
import { HistoryComponent } from './history/history.component';
import { FacadeGuard } from './guards/facade.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Route[] = [{
        path: '',
        component: FacadeComponent,
        canActivate: [FacadeGuard],
        children: [
            {
                path: '',
                component: DashboardComponent,
                pathMatch: 'full'
            },
            {
                path: 'wallet',
                component: WalletComponent
            }, {
                path: 'blocks',
                component: BlocksComponent
            }, {
                path: 'history',
                component: HistoryComponent
            }
        ]
    }, {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}