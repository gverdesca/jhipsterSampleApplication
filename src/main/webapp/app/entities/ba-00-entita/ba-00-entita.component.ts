import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ba00Entita } from './ba-00-entita.model';
import { Ba00EntitaService } from './ba-00-entita.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ba-00-entita',
    templateUrl: './ba-00-entita.component.html'
})
export class Ba00EntitaComponent implements OnInit, OnDestroy {
ba00Entitas: Ba00Entita[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ba00EntitaService: Ba00EntitaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ba00EntitaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ba00Entitas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBa00Entitas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Ba00Entita) {
        return item.id;
    }
    registerChangeInBa00Entitas() {
        this.eventSubscriber = this.eventManager.subscribe('ba00EntitaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
