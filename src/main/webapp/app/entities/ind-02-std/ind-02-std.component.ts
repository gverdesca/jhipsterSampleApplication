import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ind02Std } from './ind-02-std.model';
import { Ind02StdService } from './ind-02-std.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ind-02-std',
    templateUrl: './ind-02-std.component.html'
})
export class Ind02StdComponent implements OnInit, OnDestroy {
ind02Stds: Ind02Std[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ind02StdService: Ind02StdService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ind02StdService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ind02Stds = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInd02Stds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Ind02Std) {
        return item.id;
    }
    registerChangeInInd02Stds() {
        this.eventSubscriber = this.eventManager.subscribe('ind02StdListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
