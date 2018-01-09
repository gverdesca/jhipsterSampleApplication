import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ind04Classif } from './ind-04-classif.model';
import { Ind04ClassifService } from './ind-04-classif.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ind-04-classif',
    templateUrl: './ind-04-classif.component.html'
})
export class Ind04ClassifComponent implements OnInit, OnDestroy {
ind04Classifs: Ind04Classif[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ind04ClassifService: Ind04ClassifService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ind04ClassifService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ind04Classifs = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInd04Classifs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Ind04Classif) {
        return item.id;
    }
    registerChangeInInd04Classifs() {
        this.eventSubscriber = this.eventManager.subscribe('ind04ClassifListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
