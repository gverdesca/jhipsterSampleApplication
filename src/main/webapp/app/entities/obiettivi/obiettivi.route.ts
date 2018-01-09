import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ObiettiviComponent } from './obiettivi.component';
import { ObiettiviDetailComponent } from './obiettivi-detail.component';
import { ObiettiviPopupComponent } from './obiettivi-dialog.component';
import { ObiettiviDeletePopupComponent } from './obiettivi-delete-dialog.component';

export const obiettiviRoute: Routes = [
    {
        path: 'obiettivi',
        component: ObiettiviComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Obiettivis'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'obiettivi/:id',
        component: ObiettiviDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Obiettivis'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const obiettiviPopupRoute: Routes = [
    {
        path: 'obiettivi-new',
        component: ObiettiviPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Obiettivis'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'obiettivi/:id/edit',
        component: ObiettiviPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Obiettivis'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'obiettivi/:id/delete',
        component: ObiettiviDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Obiettivis'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
