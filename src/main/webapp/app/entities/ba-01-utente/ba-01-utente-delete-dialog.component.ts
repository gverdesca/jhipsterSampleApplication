import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ba01Utente } from './ba-01-utente.model';
import { Ba01UtentePopupService } from './ba-01-utente-popup.service';
import { Ba01UtenteService } from './ba-01-utente.service';

@Component({
    selector: 'jhi-ba-01-utente-delete-dialog',
    templateUrl: './ba-01-utente-delete-dialog.component.html'
})
export class Ba01UtenteDeleteDialogComponent {

    ba01Utente: Ba01Utente;

    constructor(
        private ba01UtenteService: Ba01UtenteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ba01UtenteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ba01UtenteListModification',
                content: 'Deleted an ba01Utente'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ba-01-utente-delete-popup',
    template: ''
})
export class Ba01UtenteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ba01UtentePopupService: Ba01UtentePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ba01UtentePopupService
                .open(Ba01UtenteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
