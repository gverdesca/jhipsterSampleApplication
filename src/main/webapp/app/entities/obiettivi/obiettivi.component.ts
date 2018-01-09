import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Obiettivi } from './obiettivi.model';
import { ObiettiviService } from './obiettivi.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-obiettivi',
    templateUrl: './obiettivi.component.html'
})
export class ObiettiviComponent implements OnInit, OnDestroy {
obiettivis: Obiettivi[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private obiettiviService: ObiettiviService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.obiettiviService.query().subscribe(
            (res: ResponseWrapper) => {
                this.obiettivis = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInObiettivis();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Obiettivi) {
        return item.id;
    }
    registerChangeInObiettivis() {
        this.eventSubscriber = this.eventManager.subscribe('obiettiviListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
