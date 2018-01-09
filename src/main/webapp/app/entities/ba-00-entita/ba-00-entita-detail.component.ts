import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Ba00Entita } from './ba-00-entita.model';
import { Ba00EntitaService } from './ba-00-entita.service';

@Component({
    selector: 'jhi-ba-00-entita-detail',
    templateUrl: './ba-00-entita-detail.component.html'
})
export class Ba00EntitaDetailComponent implements OnInit, OnDestroy {

    ba00Entita: Ba00Entita;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ba00EntitaService: Ba00EntitaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBa00Entitas();
    }

    load(id) {
        this.ba00EntitaService.find(id).subscribe((ba00Entita) => {
            this.ba00Entita = ba00Entita;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBa00Entitas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ba00EntitaListModification',
            (response) => this.load(this.ba00Entita.id)
        );
    }
}
