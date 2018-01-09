import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterSampleApplicationBa11DshModule } from './ba-11-dsh/ba-11-dsh.module';
import { JhipsterSampleApplicationDatasourceModule } from './datasource/datasource.module';
import { JhipsterSampleApplicationBa10MenuModule } from './ba-10-menu/ba-10-menu.module';
import { JhipsterSampleApplicationMondrianDsModule } from './mondrian-ds/mondrian-ds.module';
import { JhipsterSampleApplicationBa01UtenteModule } from './ba-01-utente/ba-01-utente.module';
import { JhipsterSampleApplicationBa00EntitaModule } from './ba-00-entita/ba-00-entita.module';
import { JhipsterSampleApplicationBa12WidgetModule } from './ba-12-widget/ba-12-widget.module';
import { JhipsterSampleApplicationTipiWidgetModule } from './tipi-widget/tipi-widget.module';
import { JhipsterSampleApplicationWidgetImplModule } from './widget-impl/widget-impl.module';
import { JhipsterSampleApplicationInd12QueryModule } from './ind-12-query/ind-12-query.module';
import { JhipsterSampleApplicationInd01IndicModule } from './ind-01-indic/ind-01-indic.module';
import { JhipsterSampleApplicationInd04ClassifModule } from './ind-04-classif/ind-04-classif.module';
import { JhipsterSampleApplicationInd02StdModule } from './ind-02-std/ind-02-std.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterSampleApplicationBa11DshModule,
        JhipsterSampleApplicationDatasourceModule,
        JhipsterSampleApplicationBa10MenuModule,
        JhipsterSampleApplicationMondrianDsModule,
        JhipsterSampleApplicationBa01UtenteModule,
        JhipsterSampleApplicationBa00EntitaModule,
        JhipsterSampleApplicationBa12WidgetModule,
        JhipsterSampleApplicationTipiWidgetModule,
        JhipsterSampleApplicationWidgetImplModule,
        JhipsterSampleApplicationInd12QueryModule,
        JhipsterSampleApplicationInd01IndicModule,
        JhipsterSampleApplicationInd04ClassifModule,
        JhipsterSampleApplicationInd02StdModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}
