import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Obi02IndicValu } from './obi-02-indic-valu.model';
import { Obi02IndicValuService } from './obi-02-indic-valu.service';

@Component({
    selector: 'jhi-obi-02-indic-valu-detail',
    templateUrl: './obi-02-indic-valu-detail.component.html'
})
export class Obi02IndicValuDetailComponent implements OnInit, OnDestroy {

    obi02IndicValu: Obi02IndicValu;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private obi02IndicValuService: Obi02IndicValuService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInObi02IndicValus();
    }

    load(id) {
        this.obi02IndicValuService.find(id).subscribe((obi02IndicValu) => {
            this.obi02IndicValu = obi02IndicValu;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInObi02IndicValus() {
        this.eventSubscriber = this.eventManager.subscribe(
            'obi02IndicValuListModification',
            (response) => this.load(this.obi02IndicValu.id)
        );
    }
}
