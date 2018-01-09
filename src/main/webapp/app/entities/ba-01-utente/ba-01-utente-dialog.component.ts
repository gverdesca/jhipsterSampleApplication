import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ba01Utente } from './ba-01-utente.model';
import { Ba01UtentePopupService } from './ba-01-utente-popup.service';
import { Ba01UtenteService } from './ba-01-utente.service';
import { Ba00Entita, Ba00EntitaService } from '../ba-00-entita';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ba-01-utente-dialog',
    templateUrl: './ba-01-utente-dialog.component.html'
})
export class Ba01UtenteDialogComponent implements OnInit {

    ba01Utente: Ba01Utente;
    isSaving: boolean;

    ba00entitas: Ba00Entita[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ba01UtenteService: Ba01UtenteService,
        private ba00EntitaService: Ba00EntitaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ba00EntitaService.query()
            .subscribe((res: ResponseWrapper) => { this.ba00entitas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBa00EntitaById(index: number, item: Ba00Entita) {
        return item.id;
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
