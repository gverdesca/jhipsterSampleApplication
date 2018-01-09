import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { IndicValuComponent } from './indic-valu.component';
import { IndicValuDetailComponent } from './indic-valu-detail.component';
import { IndicValuPopupComponent } from './indic-valu-dialog.component';
import { IndicValuDeletePopupComponent } from './indic-valu-delete-dialog.component';

export const indicValuRoute: Routes = [
    {
        path: 'indic-valu',
        component: IndicValuComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IndicValus'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'indic-valu/:id',
        component: IndicValuDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IndicValus'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const indicValuPopupRoute: Routes = [
    {
        path: 'indic-valu-new',
        component: IndicValuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IndicValus'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'indic-valu/:id/edit',
        component: IndicValuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IndicValus'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'indic-valu/:id/delete',
        component: IndicValuDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IndicValus'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
