import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Obi02IndicValu } from './obi-02-indic-valu.model';
import { Obi02IndicValuPopupService } from './obi-02-indic-valu-popup.service';
import { Obi02IndicValuService } from './obi-02-indic-valu.service';

@Component({
    selector: 'jhi-obi-02-indic-valu-delete-dialog',
    templateUrl: './obi-02-indic-valu-delete-dialog.component.html'
})
export class Obi02IndicValuDeleteDialogComponent {

    obi02IndicValu: Obi02IndicValu;

    constructor(
        private obi02IndicValuService: Obi02IndicValuService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.obi02IndicValuService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'obi02IndicValuListModification',
                content: 'Deleted an obi02IndicValu'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-obi-02-indic-valu-delete-popup',
    template: ''
})
export class Obi02IndicValuDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private obi02IndicValuPopupService: Obi02IndicValuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.obi02IndicValuPopupService
                .open(Obi02IndicValuDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
