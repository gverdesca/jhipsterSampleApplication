import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    IndicValIntService,
    IndicValIntPopupService,
    IndicValIntComponent,
    IndicValIntDetailComponent,
    IndicValIntDialogComponent,
    IndicValIntPopupComponent,
    IndicValIntDeletePopupComponent,
    IndicValIntDeleteDialogComponent,
    indicValIntRoute,
    indicValIntPopupRoute,
} from './';

const ENTITY_STATES = [
    ...indicValIntRoute,
    ...indicValIntPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IndicValIntComponent,
        IndicValIntDetailComponent,
        IndicValIntDialogComponent,
        IndicValIntDeleteDialogComponent,
        IndicValIntPopupComponent,
        IndicValIntDeletePopupComponent,
    ],
    entryComponents: [
        IndicValIntComponent,
        IndicValIntDialogComponent,
        IndicValIntPopupComponent,
        IndicValIntDeleteDialogComponent,
        IndicValIntDeletePopupComponent,
    ],
    providers: [
        IndicValIntService,
        IndicValIntPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationIndicValIntModule {}
