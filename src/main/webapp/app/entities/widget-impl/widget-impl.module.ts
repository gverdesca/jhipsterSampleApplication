import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    WidgetImplService,
    WidgetImplPopupService,
    WidgetImplComponent,
    WidgetImplDetailComponent,
    WidgetImplDialogComponent,
    WidgetImplPopupComponent,
    WidgetImplDeletePopupComponent,
    WidgetImplDeleteDialogComponent,
    widgetImplRoute,
    widgetImplPopupRoute,
} from './';

const ENTITY_STATES = [
    ...widgetImplRoute,
    ...widgetImplPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WidgetImplComponent,
        WidgetImplDetailComponent,
        WidgetImplDialogComponent,
        WidgetImplDeleteDialogComponent,
        WidgetImplPopupComponent,
        WidgetImplDeletePopupComponent,
    ],
    entryComponents: [
        WidgetImplComponent,
        WidgetImplDialogComponent,
        WidgetImplPopupComponent,
        WidgetImplDeleteDialogComponent,
        WidgetImplDeletePopupComponent,
    ],
    providers: [
        WidgetImplService,
        WidgetImplPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationWidgetImplModule {}
