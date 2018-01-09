import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Ind12QueryComponent } from './ind-12-query.component';
import { Ind12QueryDetailComponent } from './ind-12-query-detail.component';
import { Ind12QueryPopupComponent } from './ind-12-query-dialog.component';
import { Ind12QueryDeletePopupComponent } from './ind-12-query-delete-dialog.component';

export const ind12QueryRoute: Routes = [
    {
        path: 'ind-12-query',
        component: Ind12QueryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind12Queries'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ind-12-query/:id',
        component: Ind12QueryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind12Queries'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ind12QueryPopupRoute: Routes = [
    {
        path: 'ind-12-query-new',
        component: Ind12QueryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind12Queries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ind-12-query/:id/edit',
        component: Ind12QueryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind12Queries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ind-12-query/:id/delete',
        component: Ind12QueryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind12Queries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
