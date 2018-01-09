import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Ind04Classif } from './ind-04-classif.model';
import { Ind04ClassifService } from './ind-04-classif.service';

@Component({
    selector: 'jhi-ind-04-classif-detail',
    templateUrl: './ind-04-classif-detail.component.html'
})
export class Ind04ClassifDetailComponent implements OnInit, OnDestroy {

    ind04Classif: Ind04Classif;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ind04ClassifService: Ind04ClassifService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInd04Classifs();
    }

    load(id) {
        this.ind04ClassifService.find(id).subscribe((ind04Classif) => {
            this.ind04Classif = ind04Classif;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInd04Classifs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ind04ClassifListModification',
            (response) => this.load(this.ind04Classif.id)
        );
    }
}
