import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IndicValInt } from './indic-val-int.model';
import { IndicValIntService } from './indic-val-int.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-indic-val-int',
    templateUrl: './indic-val-int.component.html'
})
export class IndicValIntComponent implements OnInit, OnDestroy {
indicValInts: IndicValInt[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private indicValIntService: IndicValIntService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.indicValIntService.query().subscribe(
            (res: ResponseWrapper) => {
                this.indicValInts = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIndicValInts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IndicValInt) {
        return item.id;
    }
    registerChangeInIndicValInts() {
        this.eventSubscriber = this.eventManager.subscribe('indicValIntListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
