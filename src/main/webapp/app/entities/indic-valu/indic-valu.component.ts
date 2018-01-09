import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IndicValu } from './indic-valu.model';
import { IndicValuService } from './indic-valu.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-indic-valu',
    templateUrl: './indic-valu.component.html'
})
export class IndicValuComponent implements OnInit, OnDestroy {
indicValus: IndicValu[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private indicValuService: IndicValuService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.indicValuService.query().subscribe(
            (res: ResponseWrapper) => {
                this.indicValus = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIndicValus();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IndicValu) {
        return item.id;
    }
    registerChangeInIndicValus() {
        this.eventSubscriber = this.eventManager.subscribe('indicValuListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
