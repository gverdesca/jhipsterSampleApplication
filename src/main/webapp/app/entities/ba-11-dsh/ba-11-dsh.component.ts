import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ba11Dsh } from './ba-11-dsh.model';
import { Ba11DshService } from './ba-11-dsh.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ba-11-dsh',
    templateUrl: './ba-11-dsh.component.html'
})
export class Ba11DshComponent implements OnInit, OnDestroy {
ba11Dshes: Ba11Dsh[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ba11DshService: Ba11DshService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ba11DshService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ba11Dshes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBa11Dshes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Ba11Dsh) {
        return item.id;
    }
    registerChangeInBa11Dshes() {
        this.eventSubscriber = this.eventManager.subscribe('ba11DshListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
