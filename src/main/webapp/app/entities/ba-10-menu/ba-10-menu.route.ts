import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Ba10MenuComponent } from './ba-10-menu.component';
import { Ba10MenuDetailComponent } from './ba-10-menu-detail.component';
import { Ba10MenuPopupComponent } from './ba-10-menu-dialog.component';
import { Ba10MenuDeletePopupComponent } from './ba-10-menu-delete-dialog.component';

export const ba10MenuRoute: Routes = [
    {
        path: 'ba-10-menu',
        component: Ba10MenuComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba10Menus'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ba-10-menu/:id',
        component: Ba10MenuDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba10Menus'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ba10MenuPopupRoute: Routes = [
    {
        path: 'ba-10-menu-new',
        component: Ba10MenuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba10Menus'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ba-10-menu/:id/edit',
        component: Ba10MenuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba10Menus'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ba-10-menu/:id/delete',
        component: Ba10MenuDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba10Menus'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
