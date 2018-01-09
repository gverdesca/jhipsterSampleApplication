import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IndicValIn } from './indic-val-in.model';
import { IndicValInPopupService } from './indic-val-in-popup.service';
import { IndicValInService } from './indic-val-in.service';

@Component({
    selector: 'jhi-indic-val-in-delete-dialog',
    templateUrl: './indic-val-in-delete-dialog.component.html'
})
export class IndicValInDeleteDialogComponent {

    indicValIn: IndicValIn;

    constructor(
        private indicValInService: IndicValInService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.indicValInService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'indicValInListModification',
                content: 'Deleted an indicValIn'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-indic-val-in-delete-popup',
    template: ''
})
export class IndicValInDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private indicValInPopupService: IndicValInPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.indicValInPopupService
                .open(IndicValInDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
