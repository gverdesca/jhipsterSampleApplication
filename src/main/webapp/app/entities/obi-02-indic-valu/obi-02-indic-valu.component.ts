import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Obi02IndicValu } from './obi-02-indic-valu.model';
import { Obi02IndicValuService } from './obi-02-indic-valu.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-obi-02-indic-valu',
    templateUrl: './obi-02-indic-valu.component.html'
})
export class Obi02IndicValuComponent implements OnInit, OnDestroy {
obi02IndicValus: Obi02IndicValu[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private obi02IndicValuService: Obi02IndicValuService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.obi02IndicValuService.query().subscribe(
            (res: ResponseWrapper) => {
                this.obi02IndicValus = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInObi02IndicValus();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Obi02IndicValu) {
        return item.id;
    }
    registerChangeInObi02IndicValus() {
        this.eventSubscriber = this.eventManager.subscribe('obi02IndicValuListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
