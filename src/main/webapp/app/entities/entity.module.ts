import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterSampleApplicationBa00EntitaModule } from './ba-00-entita/ba-00-entita.module';
import { JhipsterSampleApplicationBa01UtenteModule } from './ba-01-utente/ba-01-utente.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterSampleApplicationBa00EntitaModule,
        JhipsterSampleApplicationBa01UtenteModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}
