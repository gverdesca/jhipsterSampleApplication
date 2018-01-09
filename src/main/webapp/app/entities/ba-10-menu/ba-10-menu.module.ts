import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    Ba10MenuService,
    Ba10MenuPopupService,
    Ba10MenuComponent,
    Ba10MenuDetailComponent,
    Ba10MenuDialogComponent,
    Ba10MenuPopupComponent,
    Ba10MenuDeletePopupComponent,
    Ba10MenuDeleteDialogComponent,
    ba10MenuRoute,
    ba10MenuPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ba10MenuRoute,
    ...ba10MenuPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        Ba10MenuComponent,
        Ba10MenuDetailComponent,
        Ba10MenuDialogComponent,
        Ba10MenuDeleteDialogComponent,
        Ba10MenuPopupComponent,
        Ba10MenuDeletePopupComponent,
    ],
    entryComponents: [
        Ba10MenuComponent,
        Ba10MenuDialogComponent,
        Ba10MenuPopupComponent,
        Ba10MenuDeleteDialogComponent,
        Ba10MenuDeletePopupComponent,
    ],
    providers: [
        Ba10MenuService,
        Ba10MenuPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationBa10MenuModule {}
