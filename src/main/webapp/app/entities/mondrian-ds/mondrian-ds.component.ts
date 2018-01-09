import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MondrianDs } from './mondrian-ds.model';
import { MondrianDsService } from './mondrian-ds.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-mondrian-ds',
    templateUrl: './mondrian-ds.component.html'
})
export class MondrianDsComponent implements OnInit, OnDestroy {
mondrianDs: MondrianDs[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mondrianDsService: MondrianDsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.mondrianDsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.mondrianDs = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMondrianDs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MondrianDs) {
        return item.id;
    }
    registerChangeInMondrianDs() {
        this.eventSubscriber = this.eventManager.subscribe('mondrianDsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
