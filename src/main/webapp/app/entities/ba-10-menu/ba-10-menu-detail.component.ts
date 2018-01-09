import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Ba10Menu } from './ba-10-menu.model';
import { Ba10MenuService } from './ba-10-menu.service';

@Component({
    selector: 'jhi-ba-10-menu-detail',
    templateUrl: './ba-10-menu-detail.component.html'
})
export class Ba10MenuDetailComponent implements OnInit, OnDestroy {

    ba10Menu: Ba10Menu;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ba10MenuService: Ba10MenuService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBa10Menus();
    }

    load(id) {
        this.ba10MenuService.find(id).subscribe((ba10Menu) => {
            this.ba10Menu = ba10Menu;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBa10Menus() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ba10MenuListModification',
            (response) => this.load(this.ba10Menu.id)
        );
    }
}
