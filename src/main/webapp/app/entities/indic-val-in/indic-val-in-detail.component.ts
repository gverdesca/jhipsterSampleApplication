import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { IndicValIn } from './indic-val-in.model';
import { IndicValInService } from './indic-val-in.service';

@Component({
    selector: 'jhi-indic-val-in-detail',
    templateUrl: './indic-val-in-detail.component.html'
})
export class IndicValInDetailComponent implements OnInit, OnDestroy {

    indicValIn: IndicValIn;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private indicValInService: IndicValInService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIndicValIns();
    }

    load(id) {
        this.indicValInService.find(id).subscribe((indicValIn) => {
            this.indicValIn = indicValIn;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIndicValIns() {
        this.eventSubscriber = this.eventManager.subscribe(
            'indicValInListModification',
            (response) => this.load(this.indicValIn.id)
        );
    }
}
