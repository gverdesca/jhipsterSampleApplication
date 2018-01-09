import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { WidgetImpl } from './widget-impl.model';
import { WidgetImplService } from './widget-impl.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-widget-impl',
    templateUrl: './widget-impl.component.html'
})
export class WidgetImplComponent implements OnInit, OnDestroy {
widgetImpls: WidgetImpl[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private widgetImplService: WidgetImplService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.widgetImplService.query().subscribe(
            (res: ResponseWrapper) => {
                this.widgetImpls = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInWidgetImpls();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: WidgetImpl) {
        return item.id;
    }
    registerChangeInWidgetImpls() {
        this.eventSubscriber = this.eventManager.subscribe('widgetImplListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
