import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { WidgetImpl } from './widget-impl.model';
import { WidgetImplService } from './widget-impl.service';

@Component({
    selector: 'jhi-widget-impl-detail',
    templateUrl: './widget-impl-detail.component.html'
})
export class WidgetImplDetailComponent implements OnInit, OnDestroy {

    widgetImpl: WidgetImpl;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private widgetImplService: WidgetImplService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInWidgetImpls();
    }

    load(id) {
        this.widgetImplService.find(id).subscribe((widgetImpl) => {
            this.widgetImpl = widgetImpl;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWidgetImpls() {
        this.eventSubscriber = this.eventManager.subscribe(
            'widgetImplListModification',
            (response) => this.load(this.widgetImpl.id)
        );
    }
}
