import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DatasourceComponent } from './datasource.component';
import { DatasourceDetailComponent } from './datasource-detail.component';
import { DatasourcePopupComponent } from './datasource-dialog.component';
import { DatasourceDeletePopupComponent } from './datasource-delete-dialog.component';

export const datasourceRoute: Routes = [
    {
        path: 'datasource',
        component: DatasourceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Datasources'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'datasource/:id',
        component: DatasourceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Datasources'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const datasourcePopupRoute: Routes = [
    {
        path: 'datasource-new',
        component: DatasourcePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Datasources'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'datasource/:id/edit',
        component: DatasourcePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Datasources'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'datasource/:id/delete',
        component: DatasourceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Datasources'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
