import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Obiettivi } from './obiettivi.model';
import { ObiettiviService } from './obiettivi.service';

@Component({
    selector: 'jhi-obiettivi-detail',
    templateUrl: './obiettivi-detail.component.html'
})
export class ObiettiviDetailComponent implements OnInit, OnDestroy {

    obiettivi: Obiettivi;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private obiettiviService: ObiettiviService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInObiettivis();
    }

    load(id) {
        this.obiettiviService.find(id).subscribe((obiettivi) => {
            this.obiettivi = obiettivi;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInObiettivis() {
        this.eventSubscriber = this.eventManager.subscribe(
            'obiettiviListModification',
            (response) => this.load(this.obiettivi.id)
        );
    }
}
