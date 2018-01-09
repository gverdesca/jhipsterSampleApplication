import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Ba01UtenteComponent } from './ba-01-utente.component';
import { Ba01UtenteDetailComponent } from './ba-01-utente-detail.component';
import { Ba01UtentePopupComponent } from './ba-01-utente-dialog.component';
import { Ba01UtenteDeletePopupComponent } from './ba-01-utente-delete-dialog.component';

export const ba01UtenteRoute: Routes = [
    {
        path: 'ba-01-utente',
        component: Ba01UtenteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba01Utentes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ba-01-utente/:id',
        component: Ba01UtenteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba01Utentes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ba01UtentePopupRoute: Routes = [
    {
        path: 'ba-01-utente-new',
        component: Ba01UtentePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba01Utentes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ba-01-utente/:id/edit',
        component: Ba01UtentePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba01Utentes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ba-01-utente/:id/delete',
        component: Ba01UtenteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba01Utentes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
