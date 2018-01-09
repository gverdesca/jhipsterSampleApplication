import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Ba12WidgetComponent } from './ba-12-widget.component';
import { Ba12WidgetDetailComponent } from './ba-12-widget-detail.component';
import { Ba12WidgetPopupComponent } from './ba-12-widget-dialog.component';
import { Ba12WidgetDeletePopupComponent } from './ba-12-widget-delete-dialog.component';

export const ba12WidgetRoute: Routes = [
    {
        path: 'ba-12-widget',
        component: Ba12WidgetComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba12Widgets'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ba-12-widget/:id',
        component: Ba12WidgetDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba12Widgets'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ba12WidgetPopupRoute: Routes = [
    {
        path: 'ba-12-widget-new',
        component: Ba12WidgetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba12Widgets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ba-12-widget/:id/edit',
        component: Ba12WidgetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba12Widgets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ba-12-widget/:id/delete',
        component: Ba12WidgetDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ba12Widgets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
