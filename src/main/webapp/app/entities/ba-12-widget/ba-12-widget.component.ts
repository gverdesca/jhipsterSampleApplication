import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ba12Widget } from './ba-12-widget.model';
import { Ba12WidgetService } from './ba-12-widget.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ba-12-widget',
    templateUrl: './ba-12-widget.component.html'
})
export class Ba12WidgetComponent implements OnInit, OnDestroy {
ba12Widgets: Ba12Widget[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ba12WidgetService: Ba12WidgetService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ba12WidgetService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ba12Widgets = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBa12Widgets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Ba12Widget) {
        return item.id;
    }
    registerChangeInBa12Widgets() {
        this.eventSubscriber = this.eventManager.subscribe('ba12WidgetListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
