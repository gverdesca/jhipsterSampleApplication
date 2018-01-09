import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TipiWidgetComponent } from './tipi-widget.component';
import { TipiWidgetDetailComponent } from './tipi-widget-detail.component';
import { TipiWidgetPopupComponent } from './tipi-widget-dialog.component';
import { TipiWidgetDeletePopupComponent } from './tipi-widget-delete-dialog.component';

export const tipiWidgetRoute: Routes = [
    {
        path: 'tipi-widget',
        component: TipiWidgetComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipiWidgets'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipi-widget/:id',
        component: TipiWidgetDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipiWidgets'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipiWidgetPopupRoute: Routes = [
    {
        path: 'tipi-widget-new',
        component: TipiWidgetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipiWidgets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipi-widget/:id/edit',
        component: TipiWidgetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipiWidgets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipi-widget/:id/delete',
        component: TipiWidgetDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipiWidgets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
