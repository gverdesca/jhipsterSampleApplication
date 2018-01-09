import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    MondrianDsService,
    MondrianDsPopupService,
    MondrianDsComponent,
    MondrianDsDetailComponent,
    MondrianDsDialogComponent,
    MondrianDsPopupComponent,
    MondrianDsDeletePopupComponent,
    MondrianDsDeleteDialogComponent,
    mondrianDsRoute,
    mondrianDsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...mondrianDsRoute,
    ...mondrianDsPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MondrianDsComponent,
        MondrianDsDetailComponent,
        MondrianDsDialogComponent,
        MondrianDsDeleteDialogComponent,
        MondrianDsPopupComponent,
        MondrianDsDeletePopupComponent,
    ],
    entryComponents: [
        MondrianDsComponent,
        MondrianDsDialogComponent,
        MondrianDsPopupComponent,
        MondrianDsDeleteDialogComponent,
        MondrianDsDeletePopupComponent,
    ],
    providers: [
        MondrianDsService,
        MondrianDsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationMondrianDsModule {}
