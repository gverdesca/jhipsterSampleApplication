import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    ObiettiviService,
    ObiettiviPopupService,
    ObiettiviComponent,
    ObiettiviDetailComponent,
    ObiettiviDialogComponent,
    ObiettiviPopupComponent,
    ObiettiviDeletePopupComponent,
    ObiettiviDeleteDialogComponent,
    obiettiviRoute,
    obiettiviPopupRoute,
} from './';

const ENTITY_STATES = [
    ...obiettiviRoute,
    ...obiettiviPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ObiettiviComponent,
        ObiettiviDetailComponent,
        ObiettiviDialogComponent,
        ObiettiviDeleteDialogComponent,
        ObiettiviPopupComponent,
        ObiettiviDeletePopupComponent,
    ],
    entryComponents: [
        ObiettiviComponent,
        ObiettiviDialogComponent,
        ObiettiviPopupComponent,
        ObiettiviDeleteDialogComponent,
        ObiettiviDeletePopupComponent,
    ],
    providers: [
        ObiettiviService,
        ObiettiviPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationObiettiviModule {}
