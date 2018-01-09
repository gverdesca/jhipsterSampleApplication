import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ObiettiviInd } from './obiettivi-ind.model';
import { ObiettiviIndService } from './obiettivi-ind.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-obiettivi-ind',
    templateUrl: './obiettivi-ind.component.html'
})
export class ObiettiviIndComponent implements OnInit, OnDestroy {
obiettiviInds: ObiettiviInd[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private obiettiviIndService: ObiettiviIndService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.obiettiviIndService.query().subscribe(
            (res: ResponseWrapper) => {
                this.obiettiviInds = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInObiettiviInds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ObiettiviInd) {
        return item.id;
    }
    registerChangeInObiettiviInds() {
        this.eventSubscriber = this.eventManager.subscribe('obiettiviIndListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
