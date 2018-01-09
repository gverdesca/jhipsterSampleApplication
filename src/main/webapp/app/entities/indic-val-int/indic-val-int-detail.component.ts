import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { IndicValInt } from './indic-val-int.model';
import { IndicValIntService } from './indic-val-int.service';

@Component({
    selector: 'jhi-indic-val-int-detail',
    templateUrl: './indic-val-int-detail.component.html'
})
export class IndicValIntDetailComponent implements OnInit, OnDestroy {

    indicValInt: IndicValInt;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private indicValIntService: IndicValIntService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIndicValInts();
    }

    load(id) {
        this.indicValIntService.find(id).subscribe((indicValInt) => {
            this.indicValInt = indicValInt;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIndicValInts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'indicValIntListModification',
            (response) => this.load(this.indicValInt.id)
        );
    }
}
