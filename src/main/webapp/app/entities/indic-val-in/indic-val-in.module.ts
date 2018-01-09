import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    IndicValInService,
    IndicValInPopupService,
    IndicValInComponent,
    IndicValInDetailComponent,
    IndicValInDialogComponent,
    IndicValInPopupComponent,
    IndicValInDeletePopupComponent,
    IndicValInDeleteDialogComponent,
    indicValInRoute,
    indicValInPopupRoute,
} from './';

const ENTITY_STATES = [
    ...indicValInRoute,
    ...indicValInPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IndicValInComponent,
        IndicValInDetailComponent,
        IndicValInDialogComponent,
        IndicValInDeleteDialogComponent,
        IndicValInPopupComponent,
        IndicValInDeletePopupComponent,
    ],
    entryComponents: [
        IndicValInComponent,
        IndicValInDialogComponent,
        IndicValInPopupComponent,
        IndicValInDeleteDialogComponent,
        IndicValInDeletePopupComponent,
    ],
    providers: [
        IndicValInService,
        IndicValInPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationIndicValInModule {}
