import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Obi02IndicValuComponent } from './obi-02-indic-valu.component';
import { Obi02IndicValuDetailComponent } from './obi-02-indic-valu-detail.component';
import { Obi02IndicValuPopupComponent } from './obi-02-indic-valu-dialog.component';
import { Obi02IndicValuDeletePopupComponent } from './obi-02-indic-valu-delete-dialog.component';

export const obi02IndicValuRoute: Routes = [
    {
        path: 'obi-02-indic-valu',
        component: Obi02IndicValuComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Obi02IndicValus'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'obi-02-indic-valu/:id',
        component: Obi02IndicValuDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Obi02IndicValus'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const obi02IndicValuPopupRoute: Routes = [
    {
        path: 'obi-02-indic-valu-new',
        component: Obi02IndicValuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Obi02IndicValus'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'obi-02-indic-valu/:id/edit',
        component: Obi02IndicValuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Obi02IndicValus'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'obi-02-indic-valu/:id/delete',
        component: Obi02IndicValuDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Obi02IndicValus'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
