import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Ind12Query } from './ind-12-query.model';
import { Ind12QueryService } from './ind-12-query.service';

@Component({
    selector: 'jhi-ind-12-query-detail',
    templateUrl: './ind-12-query-detail.component.html'
})
export class Ind12QueryDetailComponent implements OnInit, OnDestroy {

    ind12Query: Ind12Query;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ind12QueryService: Ind12QueryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInd12Queries();
    }

    load(id) {
        this.ind12QueryService.find(id).subscribe((ind12Query) => {
            this.ind12Query = ind12Query;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInd12Queries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ind12QueryListModification',
            (response) => this.load(this.ind12Query.id)
        );
    }
}
