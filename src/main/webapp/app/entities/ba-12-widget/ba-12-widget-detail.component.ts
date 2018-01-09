import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Ba12Widget } from './ba-12-widget.model';
import { Ba12WidgetService } from './ba-12-widget.service';

@Component({
    selector: 'jhi-ba-12-widget-detail',
    templateUrl: './ba-12-widget-detail.component.html'
})
export class Ba12WidgetDetailComponent implements OnInit, OnDestroy {

    ba12Widget: Ba12Widget;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ba12WidgetService: Ba12WidgetService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBa12Widgets();
    }

    load(id) {
        this.ba12WidgetService.find(id).subscribe((ba12Widget) => {
            this.ba12Widget = ba12Widget;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBa12Widgets() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ba12WidgetListModification',
            (response) => this.load(this.ba12Widget.id)
        );
    }
}
