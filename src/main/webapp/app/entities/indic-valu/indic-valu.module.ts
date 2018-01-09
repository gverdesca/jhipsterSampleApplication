import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    IndicValuService,
    IndicValuPopupService,
    IndicValuComponent,
    IndicValuDetailComponent,
    IndicValuDialogComponent,
    IndicValuPopupComponent,
    IndicValuDeletePopupComponent,
    IndicValuDeleteDialogComponent,
    indicValuRoute,
    indicValuPopupRoute,
} from './';

const ENTITY_STATES = [
    ...indicValuRoute,
    ...indicValuPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IndicValuComponent,
        IndicValuDetailComponent,
        IndicValuDialogComponent,
        IndicValuDeleteDialogComponent,
        IndicValuPopupComponent,
        IndicValuDeletePopupComponent,
    ],
    entryComponents: [
        IndicValuComponent,
        IndicValuDialogComponent,
        IndicValuPopupComponent,
        IndicValuDeleteDialogComponent,
        IndicValuDeletePopupComponent,
    ],
    providers: [
        IndicValuService,
        IndicValuPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationIndicValuModule {}
