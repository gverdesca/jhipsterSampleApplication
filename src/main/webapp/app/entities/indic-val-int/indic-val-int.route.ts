import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { IndicValIntComponent } from './indic-val-int.component';
import { IndicValIntDetailComponent } from './indic-val-int-detail.component';
import { IndicValIntPopupComponent } from './indic-val-int-dialog.component';
import { IndicValIntDeletePopupComponent } from './indic-val-int-delete-dialog.component';

export const indicValIntRoute: Routes = [
    {
        path: 'indic-val-int',
        component: IndicValIntComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IndicValInts'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'indic-val-int/:id',
        component: IndicValIntDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IndicValInts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const indicValIntPopupRoute: Routes = [
    {
        path: 'indic-val-int-new',
        component: IndicValIntPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IndicValInts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'indic-val-int/:id/edit',
        component: IndicValIntPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IndicValInts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'indic-val-int/:id/delete',
        component: IndicValIntDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IndicValInts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
