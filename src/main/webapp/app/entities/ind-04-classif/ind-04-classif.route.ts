import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Ind04ClassifComponent } from './ind-04-classif.component';
import { Ind04ClassifDetailComponent } from './ind-04-classif-detail.component';
import { Ind04ClassifPopupComponent } from './ind-04-classif-dialog.component';
import { Ind04ClassifDeletePopupComponent } from './ind-04-classif-delete-dialog.component';

export const ind04ClassifRoute: Routes = [
    {
        path: 'ind-04-classif',
        component: Ind04ClassifComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind04Classifs'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ind-04-classif/:id',
        component: Ind04ClassifDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind04Classifs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ind04ClassifPopupRoute: Routes = [
    {
        path: 'ind-04-classif-new',
        component: Ind04ClassifPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind04Classifs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ind-04-classif/:id/edit',
        component: Ind04ClassifPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind04Classifs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ind-04-classif/:id/delete',
        component: Ind04ClassifDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ind04Classifs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
