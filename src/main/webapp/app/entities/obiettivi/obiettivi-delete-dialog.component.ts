import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Obiettivi } from './obiettivi.model';
import { ObiettiviPopupService } from './obiettivi-popup.service';
import { ObiettiviService } from './obiettivi.service';

@Component({
    selector: 'jhi-obiettivi-delete-dialog',
    templateUrl: './obiettivi-delete-dialog.component.html'
})
export class ObiettiviDeleteDialogComponent {

    obiettivi: Obiettivi;

    constructor(
        private obiettiviService: ObiettiviService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.obiettiviService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'obiettiviListModification',
                content: 'Deleted an obiettivi'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-obiettivi-delete-popup',
    template: ''
})
export class ObiettiviDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private obiettiviPopupService: ObiettiviPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.obiettiviPopupService
                .open(ObiettiviDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
