import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { IndicValInComponent } from './indic-val-in.component';
import { IndicValInDetailComponent } from './indic-val-in-detail.component';
import { IndicValInPopupComponent } from './indic-val-in-dialog.component';
import { IndicValInDeletePopupComponent } from './indic-val-in-delete-dialog.component';

export const indicValInRoute: Routes = [
    {
        path: 'indic-val-in',
        component: IndicValInComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IndicValIns'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'indic-val-in/:id',
        component: IndicValInDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IndicValIns'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const indicValInPopupRoute: Routes = [
    {
        path: 'indic-val-in-new',
        component: IndicValInPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IndicValIns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'indic-val-in/:id/edit',
        component: IndicValInPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IndicValIns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'indic-val-in/:id/delete',
        component: IndicValInDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IndicValIns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
