import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    Ba12WidgetService,
    Ba12WidgetPopupService,
    Ba12WidgetComponent,
    Ba12WidgetDetailComponent,
    Ba12WidgetDialogComponent,
    Ba12WidgetPopupComponent,
    Ba12WidgetDeletePopupComponent,
    Ba12WidgetDeleteDialogComponent,
    ba12WidgetRoute,
    ba12WidgetPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ba12WidgetRoute,
    ...ba12WidgetPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        Ba12WidgetComponent,
        Ba12WidgetDetailComponent,
        Ba12WidgetDialogComponent,
        Ba12WidgetDeleteDialogComponent,
        Ba12WidgetPopupComponent,
        Ba12WidgetDeletePopupComponent,
    ],
    entryComponents: [
        Ba12WidgetComponent,
        Ba12WidgetDialogComponent,
        Ba12WidgetPopupComponent,
        Ba12WidgetDeleteDialogComponent,
        Ba12WidgetDeletePopupComponent,
    ],
    providers: [
        Ba12WidgetService,
        Ba12WidgetPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationBa12WidgetModule {}
