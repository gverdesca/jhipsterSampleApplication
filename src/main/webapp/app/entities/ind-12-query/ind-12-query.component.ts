import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ind12Query } from './ind-12-query.model';
import { Ind12QueryService } from './ind-12-query.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ind-12-query',
    templateUrl: './ind-12-query.component.html'
})
export class Ind12QueryComponent implements OnInit, OnDestroy {
ind12Queries: Ind12Query[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ind12QueryService: Ind12QueryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ind12QueryService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ind12Queries = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInd12Queries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Ind12Query) {
        return item.id;
    }
    registerChangeInInd12Queries() {
        this.eventSubscriber = this.eventManager.subscribe('ind12QueryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
