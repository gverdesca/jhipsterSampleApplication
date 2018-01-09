import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ba01Utente } from './ba-01-utente.model';
import { Ba01UtenteService } from './ba-01-utente.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ba-01-utente',
    templateUrl: './ba-01-utente.component.html'
})
export class Ba01UtenteComponent implements OnInit, OnDestroy {
ba01Utentes: Ba01Utente[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ba01UtenteService: Ba01UtenteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ba01UtenteService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ba01Utentes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBa01Utentes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Ba01Utente) {
        return item.id;
    }
    registerChangeInBa01Utentes() {
        this.eventSubscriber = this.eventManager.subscribe('ba01UtenteListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
