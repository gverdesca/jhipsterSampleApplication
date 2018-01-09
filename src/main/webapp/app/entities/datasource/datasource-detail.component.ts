import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Datasource } from './datasource.model';
import { DatasourceService } from './datasource.service';

@Component({
    selector: 'jhi-datasource-detail',
    templateUrl: './datasource-detail.component.html'
})
export class DatasourceDetailComponent implements OnInit, OnDestroy {

    datasource: Datasource;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private datasourceService: DatasourceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDatasources();
    }

    load(id) {
        this.datasourceService.find(id).subscribe((datasource) => {
            this.datasource = datasource;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDatasources() {
        this.eventSubscriber = this.eventManager.subscribe(
            'datasourceListModification',
            (response) => this.load(this.datasource.id)
        );
    }
}
