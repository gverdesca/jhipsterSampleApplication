import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Ind01Indic } from './ind-01-indic.model';
import { Ind01IndicService } from './ind-01-indic.service';

@Component({
    selector: 'jhi-ind-01-indic-detail',
    templateUrl: './ind-01-indic-detail.component.html'
})
export class Ind01IndicDetailComponent implements OnInit, OnDestroy {

    ind01Indic: Ind01Indic;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ind01IndicService: Ind01IndicService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInd01Indics();
    }

    load(id) {
        this.ind01IndicService.find(id).subscribe((ind01Indic) => {
            this.ind01Indic = ind01Indic;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInd01Indics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ind01IndicListModification',
            (response) => this.load(this.ind01Indic.id)
        );
    }
}
