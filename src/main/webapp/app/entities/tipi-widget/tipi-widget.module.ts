import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    TipiWidgetService,
    TipiWidgetPopupService,
    TipiWidgetComponent,
    TipiWidgetDetailComponent,
    TipiWidgetDialogComponent,
    TipiWidgetPopupComponent,
    TipiWidgetDeletePopupComponent,
    TipiWidgetDeleteDialogComponent,
    tipiWidgetRoute,
    tipiWidgetPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipiWidgetRoute,
    ...tipiWidgetPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipiWidgetComponent,
        TipiWidgetDetailComponent,
        TipiWidgetDialogComponent,
        TipiWidgetDeleteDialogComponent,
        TipiWidgetPopupComponent,
        TipiWidgetDeletePopupComponent,
    ],
    entryComponents: [
        TipiWidgetComponent,
        TipiWidgetDialogComponent,
        TipiWidgetPopupComponent,
        TipiWidgetDeleteDialogComponent,
        TipiWidgetDeletePopupComponent,
    ],
    providers: [
        TipiWidgetService,
        TipiWidgetPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationTipiWidgetModule {}
