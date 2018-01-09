import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ind01Indic } from './ind-01-indic.model';
import { Ind01IndicService } from './ind-01-indic.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ind-01-indic',
    templateUrl: './ind-01-indic.component.html'
})
export class Ind01IndicComponent implements OnInit, OnDestroy {
ind01Indics: Ind01Indic[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ind01IndicService: Ind01IndicService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ind01IndicService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ind01Indics = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInd01Indics();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Ind01Indic) {
        return item.id;
    }
    registerChangeInInd01Indics() {
        this.eventSubscriber = this.eventManager.subscribe('ind01IndicListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
