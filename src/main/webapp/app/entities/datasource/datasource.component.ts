import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Datasource } from './datasource.model';
import { DatasourceService } from './datasource.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-datasource',
    templateUrl: './datasource.component.html'
})
export class DatasourceComponent implements OnInit, OnDestroy {
datasources: Datasource[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private datasourceService: DatasourceService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.datasourceService.query().subscribe(
            (res: ResponseWrapper) => {
                this.datasources = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDatasources();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Datasource) {
        return item.id;
    }
    registerChangeInDatasources() {
        this.eventSubscriber = this.eventManager.subscribe('datasourceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
