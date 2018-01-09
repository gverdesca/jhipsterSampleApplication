import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ObiettiviInd } from './obiettivi-ind.model';
import { ObiettiviIndService } from './obiettivi-ind.service';

@Component({
    selector: 'jhi-obiettivi-ind-detail',
    templateUrl: './obiettivi-ind-detail.component.html'
})
export class ObiettiviIndDetailComponent implements OnInit, OnDestroy {

    obiettiviInd: ObiettiviInd;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private obiettiviIndService: ObiettiviIndService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInObiettiviInds();
    }

    load(id) {
        this.obiettiviIndService.find(id).subscribe((obiettiviInd) => {
            this.obiettiviInd = obiettiviInd;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInObiettiviInds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'obiettiviIndListModification',
            (response) => this.load(this.obiettiviInd.id)
        );
    }
}
