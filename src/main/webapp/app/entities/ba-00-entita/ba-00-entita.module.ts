import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    Ba00EntitaService,
    Ba00EntitaPopupService,
    Ba00EntitaComponent,
    Ba00EntitaDetailComponent,
    Ba00EntitaDialogComponent,
    Ba00EntitaPopupComponent,
    Ba00EntitaDeletePopupComponent,
    Ba00EntitaDeleteDialogComponent,
    ba00EntitaRoute,
    ba00EntitaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ba00EntitaRoute,
    ...ba00EntitaPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        Ba00EntitaComponent,
        Ba00EntitaDetailComponent,
        Ba00EntitaDialogComponent,
        Ba00EntitaDeleteDialogComponent,
        Ba00EntitaPopupComponent,
        Ba00EntitaDeletePopupComponent,
    ],
    entryComponents: [
        Ba00EntitaComponent,
        Ba00EntitaDialogComponent,
        Ba00EntitaPopupComponent,
        Ba00EntitaDeleteDialogComponent,
        Ba00EntitaDeletePopupComponent,
    ],
    providers: [
        Ba00EntitaService,
        Ba00EntitaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationBa00EntitaModule {}
