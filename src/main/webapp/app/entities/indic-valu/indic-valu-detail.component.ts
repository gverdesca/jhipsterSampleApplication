import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { IndicValu } from './indic-valu.model';
import { IndicValuService } from './indic-valu.service';

@Component({
    selector: 'jhi-indic-valu-detail',
    templateUrl: './indic-valu-detail.component.html'
})
export class IndicValuDetailComponent implements OnInit, OnDestroy {

    indicValu: IndicValu;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private indicValuService: IndicValuService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIndicValus();
    }

    load(id) {
        this.indicValuService.find(id).subscribe((indicValu) => {
            this.indicValu = indicValu;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIndicValus() {
        this.eventSubscriber = this.eventManager.subscribe(
            'indicValuListModification',
            (response) => this.load(this.indicValu.id)
        );
    }
}
