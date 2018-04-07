import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FacadeComponent } from './facade/facade.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './login/login.component';
import { WalletComponent } from './wallet/wallet.component';
import { BlocksComponent } from './blocks/blocks.component';
import { HistoryComponent } from './history/history.component';

const routes: Route[] = [{
        path: '',
        component: FacadeComponent,
        canActivate: [LoginGuard],
        children: [
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