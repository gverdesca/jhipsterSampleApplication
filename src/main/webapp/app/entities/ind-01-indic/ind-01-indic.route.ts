import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Ind01IndicComponent } from './ind-01-indic.component';
import { Ind01IndicDetailComponent } from './ind-01-indic-detail.component';
import { Ind01IndicPopupComponent } from './ind-01-indic-dialog.component';
import { Ind01IndicDeletePopupComponent } from './ind-01-indic-delete-dialog.component';

export const ind01IndicRoute: Routes = [
    {
        path: 'ind-01-indic',
        component: Ind01IndicComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind01Indics'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ind-01-indic/:id',
        component: Ind01IndicDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind01Indics'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ind01IndicPopupRoute: Routes = [
    {
        path: 'ind-01-indic-new',
        component: Ind01IndicPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind01Indics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ind-01-indic/:id/edit',
        component: Ind01IndicPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind01Indics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ind-01-indic/:id/delete',
        component: Ind01IndicDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind01Indics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
