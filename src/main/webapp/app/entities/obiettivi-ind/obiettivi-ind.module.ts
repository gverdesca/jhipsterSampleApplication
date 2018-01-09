import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    ObiettiviIndService,
    ObiettiviIndPopupService,
    ObiettiviIndComponent,
    ObiettiviIndDetailComponent,
    ObiettiviIndDialogComponent,
    ObiettiviIndPopupComponent,
    ObiettiviIndDeletePopupComponent,
    ObiettiviIndDeleteDialogComponent,
    obiettiviIndRoute,
    obiettiviIndPopupRoute,
} from './';

const ENTITY_STATES = [
    ...obiettiviIndRoute,
    ...obiettiviIndPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ObiettiviIndComponent,
        ObiettiviIndDetailComponent,
        ObiettiviIndDialogComponent,
        ObiettiviIndDeleteDialogComponent,
        ObiettiviIndPopupComponent,
        ObiettiviIndDeletePopupComponent,
    ],
    entryComponents: [
        ObiettiviIndComponent,
        ObiettiviIndDialogComponent,
        ObiettiviIndPopupComponent,
        ObiettiviIndDeleteDialogComponent,
        ObiettiviIndDeletePopupComponent,
    ],
    providers: [
        ObiettiviIndService,
        ObiettiviIndPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationObiettiviIndModule {}
