import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    Ind02StdService,
    Ind02StdPopupService,
    Ind02StdComponent,
    Ind02StdDetailComponent,
    Ind02StdDialogComponent,
    Ind02StdPopupComponent,
    Ind02StdDeletePopupComponent,
    Ind02StdDeleteDialogComponent,
    ind02StdRoute,
    ind02StdPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ind02StdRoute,
    ...ind02StdPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        Ind02StdComponent,
        Ind02StdDetailComponent,
        Ind02StdDialogComponent,
        Ind02StdDeleteDialogComponent,
        Ind02StdPopupComponent,
        Ind02StdDeletePopupComponent,
    ],
    entryComponents: [
        Ind02StdComponent,
        Ind02StdDialogComponent,
        Ind02StdPopupComponent,
        Ind02StdDeleteDialogComponent,
        Ind02StdDeletePopupComponent,
    ],
    providers: [
        Ind02StdService,
        Ind02StdPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationInd02StdModule {}
