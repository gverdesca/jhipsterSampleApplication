import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IndicValIn } from './indic-val-in.model';
import { IndicValInService } from './indic-val-in.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-indic-val-in',
    templateUrl: './indic-val-in.component.html'
})
export class IndicValInComponent implements OnInit, OnDestroy {
indicValIns: IndicValIn[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private indicValInService: IndicValInService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.indicValInService.query().subscribe(
            (res: ResponseWrapper) => {
                this.indicValIns = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIndicValIns();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IndicValIn) {
        return item.id;
    }
    registerChangeInIndicValIns() {
        this.eventSubscriber = this.eventManager.subscribe('indicValInListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
