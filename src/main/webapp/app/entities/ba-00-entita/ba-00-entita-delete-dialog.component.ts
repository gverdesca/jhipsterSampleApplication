import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ba00Entita } from './ba-00-entita.model';
import { Ba00EntitaPopupService } from './ba-00-entita-popup.service';
import { Ba00EntitaService } from './ba-00-entita.service';

@Component({
    selector: 'jhi-ba-00-entita-delete-dialog',
    templateUrl: './ba-00-entita-delete-dialog.component.html'
})
export class Ba00EntitaDeleteDialogComponent {

    ba00Entita: Ba00Entita;

    constructor(
        private ba00EntitaService: Ba00EntitaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ba00EntitaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ba00EntitaListModification',
                content: 'Deleted an ba00Entita'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ba-00-entita-delete-popup',
    template: ''
})
export class Ba00EntitaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ba00EntitaPopupService: Ba00EntitaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ba00EntitaPopupService
                .open(Ba00EntitaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
