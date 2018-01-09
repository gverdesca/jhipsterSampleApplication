import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IndicValInt } from './indic-val-int.model';
import { IndicValIntPopupService } from './indic-val-int-popup.service';
import { IndicValIntService } from './indic-val-int.service';

@Component({
    selector: 'jhi-indic-val-int-delete-dialog',
    templateUrl: './indic-val-int-delete-dialog.component.html'
})
export class IndicValIntDeleteDialogComponent {

    indicValInt: IndicValInt;

    constructor(
        private indicValIntService: IndicValIntService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.indicValIntService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'indicValIntListModification',
                content: 'Deleted an indicValInt'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-indic-val-int-delete-popup',
    template: ''
})
export class IndicValIntDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private indicValIntPopupService: IndicValIntPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.indicValIntPopupService
                .open(IndicValIntDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
