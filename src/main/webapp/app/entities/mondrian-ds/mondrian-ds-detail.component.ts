import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MondrianDs } from './mondrian-ds.model';
import { MondrianDsService } from './mondrian-ds.service';

@Component({
    selector: 'jhi-mondrian-ds-detail',
    templateUrl: './mondrian-ds-detail.component.html'
})
export class MondrianDsDetailComponent implements OnInit, OnDestroy {

    mondrianDs: MondrianDs;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mondrianDsService: MondrianDsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMondrianDs();
    }

    load(id) {
        this.mondrianDsService.find(id).subscribe((mondrianDs) => {
            this.mondrianDs = mondrianDs;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMondrianDs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mondrianDsListModification',
            (response) => this.load(this.mondrianDs.id)
        );
    }
}
