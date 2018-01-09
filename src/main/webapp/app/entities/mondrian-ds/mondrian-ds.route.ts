import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MondrianDsComponent } from './mondrian-ds.component';
import { MondrianDsDetailComponent } from './mondrian-ds-detail.component';
import { MondrianDsPopupComponent } from './mondrian-ds-dialog.component';
import { MondrianDsDeletePopupComponent } from './mondrian-ds-delete-dialog.component';

export const mondrianDsRoute: Routes = [
    {
        path: 'mondrian-ds',
        component: MondrianDsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MondrianDs'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'mondrian-ds/:id',
        component: MondrianDsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MondrianDs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mondrianDsPopupRoute: Routes = [
    {
        path: 'mondrian-ds-new',
        component: MondrianDsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MondrianDs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mondrian-ds/:id/edit',
        component: MondrianDsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MondrianDs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mondrian-ds/:id/delete',
        component: MondrianDsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MondrianDs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
