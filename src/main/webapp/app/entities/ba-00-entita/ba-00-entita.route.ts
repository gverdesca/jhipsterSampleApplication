import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Ba00EntitaComponent } from './ba-00-entita.component';
import { Ba00EntitaDetailComponent } from './ba-00-entita-detail.component';
import { Ba00EntitaPopupComponent } from './ba-00-entita-dialog.component';
import { Ba00EntitaDeletePopupComponent } from './ba-00-entita-delete-dialog.component';

export const ba00EntitaRoute: Routes = [
    {
        path: 'ba-00-entita',
        component: Ba00EntitaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba00Entitas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ba-00-entita/:id',
        component: Ba00EntitaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba00Entitas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ba00EntitaPopupRoute: Routes = [
    {
        path: 'ba-00-entita-new',
        component: Ba00EntitaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba00Entitas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ba-00-entita/:id/edit',
        component: Ba00EntitaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba00Entitas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ba-00-entita/:id/delete',
        component: Ba00EntitaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba00Entitas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
