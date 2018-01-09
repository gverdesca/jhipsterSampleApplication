import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Obiettivi } from './obiettivi.model';
import { ObiettiviPopupService } from './obiettivi-popup.service';
import { ObiettiviService } from './obiettivi.service';
import { Ba01Utente, Ba01UtenteService } from '../ba-01-utente';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-obiettivi-dialog',
    templateUrl: './obiettivi-dialog.component.html'
})
export class ObiettiviDialogComponent implements OnInit {

    obiettivi: Obiettivi;
    isSaving: boolean;

    ba01utentes: Ba01Utente[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private obiettiviService: ObiettiviService,
        private ba01UtenteService: Ba01UtenteService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ba01UtenteService.query()
            .subscribe((res: ResponseWrapper) => { this.ba01utentes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.obiettivi.id !== undefined) {
            this.subscribeToSaveResponse(
                this.obiettiviService.update(this.obiettivi));
        } else {
            this.subscribeToSaveResponse(
                this.obiettiviService.create(this.obiettivi));
        }
    }

    private subscribeToSaveResponse(result: Observable<Obiettivi>) {
        result.subscribe((res: Obiettivi) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Obiettivi) {
        this.eventManager.broadcast({ name: 'obiettiviListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBa01UtenteById(index: number, item: Ba01Utente) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-obiettivi-popup',
    template: ''
})
export class ObiettiviPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private obiettiviPopupService: ObiettiviPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.obiettiviPopupService
                    .open(ObiettiviDialogComponent as Component, params['id']);
            } else {
                this.obiettiviPopupService
                    .open(ObiettiviDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
