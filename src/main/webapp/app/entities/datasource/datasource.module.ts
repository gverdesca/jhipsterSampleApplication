import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    DatasourceService,
    DatasourcePopupService,
    DatasourceComponent,
    DatasourceDetailComponent,
    DatasourceDialogComponent,
    DatasourcePopupComponent,
    DatasourceDeletePopupComponent,
    DatasourceDeleteDialogComponent,
    datasourceRoute,
    datasourcePopupRoute,
} from './';

const ENTITY_STATES = [
    ...datasourceRoute,
    ...datasourcePopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DatasourceComponent,
        DatasourceDetailComponent,
        DatasourceDialogComponent,
        DatasourceDeleteDialogComponent,
        DatasourcePopupComponent,
        DatasourceDeletePopupComponent,
    ],
    entryComponents: [
        DatasourceComponent,
        DatasourceDialogComponent,
        DatasourcePopupComponent,
        DatasourceDeleteDialogComponent,
        DatasourceDeletePopupComponent,
    ],
    providers: [
        DatasourceService,
        DatasourcePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationDatasourceModule {}
