import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Ba11DshComponent } from './ba-11-dsh.component';
import { Ba11DshDetailComponent } from './ba-11-dsh-detail.component';
import { Ba11DshPopupComponent } from './ba-11-dsh-dialog.component';
import { Ba11DshDeletePopupComponent } from './ba-11-dsh-delete-dialog.component';

export const ba11DshRoute: Routes = [
    {
        path: 'ba-11-dsh',
        component: Ba11DshComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba11Dshes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ba-11-dsh/:id',
        component: Ba11DshDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba11Dshes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ba11DshPopupRoute: Routes = [
    {
        path: 'ba-11-dsh-new',
        component: Ba11DshPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba11Dshes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ba-11-dsh/:id/edit',
        component: Ba11DshPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba11Dshes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ba-11-dsh/:id/delete',
        component: Ba11DshDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba11Dshes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
