import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TipiWidget } from './tipi-widget.model';
import { TipiWidgetService } from './tipi-widget.service';

@Component({
    selector: 'jhi-tipi-widget-detail',
    templateUrl: './tipi-widget-detail.component.html'
})
export class TipiWidgetDetailComponent implements OnInit, OnDestroy {

    tipiWidget: TipiWidget;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipiWidgetService: TipiWidgetService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipiWidgets();
    }

    load(id) {
        this.tipiWidgetService.find(id).subscribe((tipiWidget) => {
            this.tipiWidget = tipiWidget;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipiWidgets() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipiWidgetListModification',
            (response) => this.load(this.tipiWidget.id)
        );
    }
}
