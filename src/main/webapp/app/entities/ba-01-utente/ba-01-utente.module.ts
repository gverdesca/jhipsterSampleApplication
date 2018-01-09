import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    Ba01UtenteService,
    Ba01UtentePopupService,
    Ba01UtenteComponent,
    Ba01UtenteDetailComponent,
    Ba01UtenteDialogComponent,
    Ba01UtentePopupComponent,
    Ba01UtenteDeletePopupComponent,
    Ba01UtenteDeleteDialogComponent,
    ba01UtenteRoute,
    ba01UtentePopupRoute,
} from './';

const ENTITY_STATES = [
    ...ba01UtenteRoute,
    ...ba01UtentePopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        Ba01UtenteComponent,
        Ba01UtenteDetailComponent,
        Ba01UtenteDialogComponent,
        Ba01UtenteDeleteDialogComponent,
        Ba01UtentePopupComponent,
        Ba01UtenteDeletePopupComponent,
    ],
    entryComponents: [
        Ba01UtenteComponent,
        Ba01UtenteDialogComponent,
        Ba01UtentePopupComponent,
        Ba01UtenteDeleteDialogComponent,
        Ba01UtenteDeletePopupComponent,
    ],
    providers: [
        Ba01UtenteService,
        Ba01UtentePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationBa01UtenteModule {}
