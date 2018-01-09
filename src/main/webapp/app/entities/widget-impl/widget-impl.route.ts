import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { WidgetImplComponent } from './widget-impl.component';
import { WidgetImplDetailComponent } from './widget-impl-detail.component';
import { WidgetImplPopupComponent } from './widget-impl-dialog.component';
import { WidgetImplDeletePopupComponent } from './widget-impl-delete-dialog.component';

export const widgetImplRoute: Routes = [
    {
        path: 'widget-impl',
        component: WidgetImplComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WidgetImpls'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'widget-impl/:id',
        component: WidgetImplDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WidgetImpls'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const widgetImplPopupRoute: Routes = [
    {
        path: 'widget-impl-new',
        component: WidgetImplPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WidgetImpls'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'widget-impl/:id/edit',
        component: WidgetImplPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WidgetImpls'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'widget-impl/:id/delete',
        component: WidgetImplDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WidgetImpls'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
