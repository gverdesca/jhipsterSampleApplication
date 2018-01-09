import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ObiettiviIndComponent } from './obiettivi-ind.component';
import { ObiettiviIndDetailComponent } from './obiettivi-ind-detail.component';
import { ObiettiviIndPopupComponent } from './obiettivi-ind-dialog.component';
import { ObiettiviIndDeletePopupComponent } from './obiettivi-ind-delete-dialog.component';

export const obiettiviIndRoute: Routes = [
    {
        path: 'obiettivi-ind',
        component: ObiettiviIndComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ObiettiviInds'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'obiettivi-ind/:id',
        component: ObiettiviIndDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ObiettiviInds'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const obiettiviIndPopupRoute: Routes = [
    {
        path: 'obiettivi-ind-new',
        component: ObiettiviIndPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ObiettiviInds'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'obiettivi-ind/:id/edit',
        component: ObiettiviIndPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ObiettiviInds'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'obiettivi-ind/:id/delete',
        component: ObiettiviIndDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ObiettiviInds'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
