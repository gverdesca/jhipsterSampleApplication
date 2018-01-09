import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Ba11Dsh } from './ba-11-dsh.model';
import { Ba11DshService } from './ba-11-dsh.service';

@Component({
    selector: 'jhi-ba-11-dsh-detail',
    templateUrl: './ba-11-dsh-detail.component.html'
})
export class Ba11DshDetailComponent implements OnInit, OnDestroy {

    ba11Dsh: Ba11Dsh;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ba11DshService: Ba11DshService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBa11Dshes();
    }

    load(id) {
        this.ba11DshService.find(id).subscribe((ba11Dsh) => {
            this.ba11Dsh = ba11Dsh;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBa11Dshes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ba11DshListModification',
            (response) => this.load(this.ba11Dsh.id)
        );
    }
}
