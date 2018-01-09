import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IndicValIn } from './indic-val-in.model';
import { IndicValInPopupService } from './indic-val-in-popup.service';
import { IndicValInService } from './indic-val-in.service';
import { ObiettiviInd, ObiettiviIndService } from '../obiettivi-ind';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-indic-val-in-dialog',
    templateUrl: './indic-val-in-dialog.component.html'
})
export class IndicValInDialogComponent implements OnInit {

    indicValIn: IndicValIn;
    isSaving: boolean;

    obiettiviinds: ObiettiviInd[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private indicValInService: IndicValInService,
        private obiettiviIndService: ObiettiviIndService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.obiettiviIndService.query()
            .subscribe((res: ResponseWrapper) => { this.obiettiviinds = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.indicValIn.id !== undefined) {
            this.subscribeToSaveResponse(
                this.indicValInService.update(this.indicValIn));
        } else {
            this.subscribeToSaveResponse(
                this.indicValInService.create(this.indicValIn));
        }
    }

    private subscribeToSaveResponse(result: Observable<IndicValIn>) {
        result.subscribe((res: IndicValIn) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: IndicValIn) {
        this.eventManager.broadcast({ name: 'indicValInListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackObiettiviIndById(index: number, item: ObiettiviInd) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-indic-val-in-popup',
    template: ''
})
export class IndicValInPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private indicValInPopupService: IndicValInPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.indicValInPopupService
                    .open(IndicValInDialogComponent as Component, params['id']);
            } else {
                this.indicValInPopupService
                    .open(IndicValInDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
