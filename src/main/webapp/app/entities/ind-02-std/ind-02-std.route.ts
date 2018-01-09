import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Ind02StdComponent } from './ind-02-std.component';
import { Ind02StdDetailComponent } from './ind-02-std-detail.component';
import { Ind02StdPopupComponent } from './ind-02-std-dialog.component';
import { Ind02StdDeletePopupComponent } from './ind-02-std-delete-dialog.component';

export const ind02StdRoute: Routes = [
    {
        path: 'ind-02-std',
        component: Ind02StdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind02Stds'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ind-02-std/:id',
        component: Ind02StdDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind02Stds'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ind02StdPopupRoute: Routes = [
    {
        path: 'ind-02-std-new',
        component: Ind02StdPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind02Stds'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ind-02-std/:id/edit',
        component: Ind02StdPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind02Stds'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ind-02-std/:id/delete',
        component: Ind02StdDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind02Stds'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
