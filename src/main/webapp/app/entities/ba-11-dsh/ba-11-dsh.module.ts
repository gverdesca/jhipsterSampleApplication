import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    Ba11DshService,
    Ba11DshPopupService,
    Ba11DshComponent,
    Ba11DshDetailComponent,
    Ba11DshDialogComponent,
    Ba11DshPopupComponent,
    Ba11DshDeletePopupComponent,
    Ba11DshDeleteDialogComponent,
    ba11DshRoute,
    ba11DshPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ba11DshRoute,
    ...ba11DshPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        Ba11DshComponent,
        Ba11DshDetailComponent,
        Ba11DshDialogComponent,
        Ba11DshDeleteDialogComponent,
        Ba11DshPopupComponent,
        Ba11DshDeletePopupComponent,
    ],
    entryComponents: [
        Ba11DshComponent,
        Ba11DshDialogComponent,
        Ba11DshPopupComponent,
        Ba11DshDeleteDialogComponent,
        Ba11DshDeletePopupComponent,
    ],
    providers: [
        Ba11DshService,
        Ba11DshPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationBa11DshModule {}
