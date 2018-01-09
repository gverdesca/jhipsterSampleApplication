import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    Ind04ClassifService,
    Ind04ClassifPopupService,
    Ind04ClassifComponent,
    Ind04ClassifDetailComponent,
    Ind04ClassifDialogComponent,
    Ind04ClassifPopupComponent,
    Ind04ClassifDeletePopupComponent,
    Ind04ClassifDeleteDialogComponent,
    ind04ClassifRoute,
    ind04ClassifPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ind04ClassifRoute,
    ...ind04ClassifPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        Ind04ClassifComponent,
        Ind04ClassifDetailComponent,
        Ind04ClassifDialogComponent,
        Ind04ClassifDeleteDialogComponent,
        Ind04ClassifPopupComponent,
        Ind04ClassifDeletePopupComponent,
    ],
    entryComponents: [
        Ind04ClassifComponent,
        Ind04ClassifDialogComponent,
        Ind04ClassifPopupComponent,
        Ind04ClassifDeleteDialogComponent,
        Ind04ClassifDeletePopupComponent,
    ],
    providers: [
        Ind04ClassifService,
        Ind04ClassifPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationInd04ClassifModule {}
