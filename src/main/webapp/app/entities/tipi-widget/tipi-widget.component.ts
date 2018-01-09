import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TipiWidget } from './tipi-widget.model';
import { TipiWidgetService } from './tipi-widget.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tipi-widget',
    templateUrl: './tipi-widget.component.html'
})
export class TipiWidgetComponent implements OnInit, OnDestroy {
tipiWidgets: TipiWidget[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tipiWidgetService: TipiWidgetService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tipiWidgetService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tipiWidgets = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTipiWidgets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TipiWidget) {
        return item.id;
    }
    registerChangeInTipiWidgets() {
        this.eventSubscriber = this.eventManager.subscribe('tipiWidgetListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
