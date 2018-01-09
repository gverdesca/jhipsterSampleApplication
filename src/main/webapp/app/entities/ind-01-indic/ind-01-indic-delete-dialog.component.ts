import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ind01Indic } from './ind-01-indic.model';
import { Ind01IndicPopupService } from './ind-01-indic-popup.service';
import { Ind01IndicService } from './ind-01-indic.service';

@Component({
    selector: 'jhi-ind-01-indic-delete-dialog',
    templateUrl: './ind-01-indic-delete-dialog.component.html'
})
export class Ind01IndicDeleteDialogComponent {

    ind01Indic: Ind01Indic;

    constructor(
        private ind01IndicService: Ind01IndicService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ind01IndicService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ind01IndicListModification',
                content: 'Deleted an ind01Indic'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ind-01-indic-delete-popup',
    template: ''
})
export class Ind01IndicDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ind01IndicPopupService: Ind01IndicPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ind01IndicPopupService
                .open(Ind01IndicDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
