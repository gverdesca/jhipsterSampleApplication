import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Ind02Std } from './ind-02-std.model';
import { Ind02StdService } from './ind-02-std.service';

@Component({
    selector: 'jhi-ind-02-std-detail',
    templateUrl: './ind-02-std-detail.component.html'
})
export class Ind02StdDetailComponent implements OnInit, OnDestroy {

    ind02Std: Ind02Std;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ind02StdService: Ind02StdService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInd02Stds();
    }

    load(id) {
        this.ind02StdService.find(id).subscribe((ind02Std) => {
            this.ind02Std = ind02Std;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInd02Stds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ind02StdListModification',
            (response) => this.load(this.ind02Std.id)
        );
    }
}
