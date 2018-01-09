import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ba10Menu } from './ba-10-menu.model';
import { Ba10MenuService } from './ba-10-menu.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ba-10-menu',
    templateUrl: './ba-10-menu.component.html'
})
export class Ba10MenuComponent implements OnInit, OnDestroy {
ba10Menus: Ba10Menu[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ba10MenuService: Ba10MenuService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ba10MenuService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ba10Menus = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBa10Menus();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Ba10Menu) {
        return item.id;
    }
    registerChangeInBa10Menus() {
        this.eventSubscriber = this.eventManager.subscribe('ba10MenuListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
