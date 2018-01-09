import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ba01Utente } from './ba-01-utente.model';
import { Ba01UtentePopupService } from './ba-01-utente-popup.service';
import { Ba01UtenteService } from './ba-01-utente.service';

@Component({
    selector: 'jhi-ba-01-utente-dialog',
    templateUrl: './ba-01-utente-dialog.component.html'
})
export class Ba01UtenteDialogComponent implements OnInit {

    ba01Utente: Ba01Utente;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private ba01UtenteService: Ba01UtenteService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ba01Utente.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ba01UtenteService.update(this.ba01Utente));
        } else {
            this.subscribeToSaveResponse(
                this.ba01UtenteService.create(this.ba01Utente));
        }
    }

    private subscribeToSaveResponse(result: Observable<Ba01Utente>) {
        result.subscribe((res: Ba01Utente) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Ba01Utente) {
        this.eventManager.broadcast({ name: 'ba01UtenteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-ba-01-utente-popup',
    template: ''
})
export class Ba01UtentePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ba01UtentePopupService: Ba01UtentePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ba01UtentePopupService
                    .open(Ba01UtenteDialogComponent as Component, params['id']);
            } else {
                this.ba01UtentePopupService
                    .open(Ba01UtenteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
