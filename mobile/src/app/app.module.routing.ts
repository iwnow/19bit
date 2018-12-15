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
import { BlockDetailComponent } from './block-detail/block-detail.component';
import { MarketComponent } from './market/market.component';
import { AttachmentsComponent } from './attachments/attachments.component';

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
                path: 'blocks/:id',
                component: BlockDetailComponent
            }, {
                path: 'history',
                component: HistoryComponent
            }, {
              path: 'market',
              component: MarketComponent
          }, {
            path: 'attachments',
            component: AttachmentsComponent
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
