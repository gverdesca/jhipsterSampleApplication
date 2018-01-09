import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    Ind12QueryService,
    Ind12QueryPopupService,
    Ind12QueryComponent,
    Ind12QueryDetailComponent,
    Ind12QueryDialogComponent,
    Ind12QueryPopupComponent,
    Ind12QueryDeletePopupComponent,
    Ind12QueryDeleteDialogComponent,
    ind12QueryRoute,
    ind12QueryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ind12QueryRoute,
    ...ind12QueryPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        Ind12QueryComponent,
        Ind12QueryDetailComponent,
        Ind12QueryDialogComponent,
        Ind12QueryDeleteDialogComponent,
        Ind12QueryPopupComponent,
        Ind12QueryDeletePopupComponent,
    ],
    entryComponents: [
        Ind12QueryComponent,
        Ind12QueryDialogComponent,
        Ind12QueryPopupComponent,
        Ind12QueryDeleteDialogComponent,
        Ind12QueryDeletePopupComponent,
    ],
    providers: [
        Ind12QueryService,
        Ind12QueryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationInd12QueryModule {}
