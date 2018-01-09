import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IndicValu } from './indic-valu.model';
import { IndicValuPopupService } from './indic-valu-popup.service';
import { IndicValuService } from './indic-valu.service';

@Component({
    selector: 'jhi-indic-valu-delete-dialog',
    templateUrl: './indic-valu-delete-dialog.component.html'
})
export class IndicValuDeleteDialogComponent {

    indicValu: IndicValu;

    constructor(
        private indicValuService: IndicValuService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.indicValuService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'indicValuListModification',
                content: 'Deleted an indicValu'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-indic-valu-delete-popup',
    template: ''
})
export class IndicValuDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private indicValuPopupService: IndicValuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.indicValuPopupService
                .open(IndicValuDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
