import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Ba01Utente } from './ba-01-utente.model';
import { Ba01UtenteService } from './ba-01-utente.service';

@Component({
    selector: 'jhi-ba-01-utente-detail',
    templateUrl: './ba-01-utente-detail.component.html'
})
export class Ba01UtenteDetailComponent implements OnInit, OnDestroy {

    ba01Utente: Ba01Utente;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ba01UtenteService: Ba01UtenteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBa01Utentes();
    }

    load(id) {
        this.ba01UtenteService.find(id).subscribe((ba01Utente) => {
            this.ba01Utente = ba01Utente;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBa01Utentes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ba01UtenteListModification',
            (response) => this.load(this.ba01Utente.id)
        );
    }
}
