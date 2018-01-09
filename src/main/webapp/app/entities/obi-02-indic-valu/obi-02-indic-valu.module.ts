import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    Obi02IndicValuService,
    Obi02IndicValuPopupService,
    Obi02IndicValuComponent,
    Obi02IndicValuDetailComponent,
    Obi02IndicValuDialogComponent,
    Obi02IndicValuPopupComponent,
    Obi02IndicValuDeletePopupComponent,
    Obi02IndicValuDeleteDialogComponent,
    obi02IndicValuRoute,
    obi02IndicValuPopupRoute,
} from './';

const ENTITY_STATES = [
    ...obi02IndicValuRoute,
    ...obi02IndicValuPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        Obi02IndicValuComponent,
        Obi02IndicValuDetailComponent,
        Obi02IndicValuDialogComponent,
        Obi02IndicValuDeleteDialogComponent,
        Obi02IndicValuPopupComponent,
        Obi02IndicValuDeletePopupComponent,
    ],
    entryComponents: [
        Obi02IndicValuComponent,
        Obi02IndicValuDialogComponent,
        Obi02IndicValuPopupComponent,
        Obi02IndicValuDeleteDialogComponent,
        Obi02IndicValuDeletePopupComponent,
    ],
    providers: [
        Obi02IndicValuService,
        Obi02IndicValuPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationObi02IndicValuModule {}
