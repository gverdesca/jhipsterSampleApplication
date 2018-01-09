import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    Ind01IndicService,
    Ind01IndicPopupService,
    Ind01IndicComponent,
    Ind01IndicDetailComponent,
    Ind01IndicDialogComponent,
    Ind01IndicPopupComponent,
    Ind01IndicDeletePopupComponent,
    Ind01IndicDeleteDialogComponent,
    ind01IndicRoute,
    ind01IndicPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ind01IndicRoute,
    ...ind01IndicPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        Ind01IndicComponent,
        Ind01IndicDetailComponent,
        Ind01IndicDialogComponent,
        Ind01IndicDeleteDialogComponent,
        Ind01IndicPopupComponent,
        Ind01IndicDeletePopupComponent,
    ],
    entryComponents: [
        Ind01IndicComponent,
        Ind01IndicDialogComponent,
        Ind01IndicPopupComponent,
        Ind01IndicDeleteDialogComponent,
        Ind01IndicDeletePopupComponent,
    ],
    providers: [
        Ind01IndicService,
        Ind01IndicPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationInd01IndicModule {}
