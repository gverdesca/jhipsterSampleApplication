import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Datasource } from './datasource.model';
import { DatasourcePopupService } from './datasource-popup.service';
import { DatasourceService } from './datasource.service';
import { Ba01Utente, Ba01UtenteService } from '../ba-01-utente';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-datasource-dialog',
    templateUrl: './datasource-dialog.component.html'
})
export class DatasourceDialogComponent implements OnInit {

    datasource: Datasource;
    isSaving: boolean;

    ba01utentes: Ba01Utente[];
    tsCreazDp: any;
    tsModifDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private datasourceService: DatasourceService,
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
        if (this.datasource.id !== undefined) {
            this.subscribeToSaveResponse(
                this.datasourceService.update(this.datasource));
        } else {
            this.subscribeToSaveResponse(
                this.datasourceService.create(this.datasource));
        }
    }

    private subscribeToSaveResponse(result: Observable<Datasource>) {
        result.subscribe((res: Datasource) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Datasource) {
        this.eventManager.broadcast({ name: 'datasourceListModification', content: 'OK'});
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
    selector: 'jhi-datasource-popup',
    template: ''
})
export class DatasourcePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private datasourcePopupService: DatasourcePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.datasourcePopupService
                    .open(DatasourceDialogComponent as Component, params['id']);
            } else {
                this.datasourcePopupService
                    .open(DatasourceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
