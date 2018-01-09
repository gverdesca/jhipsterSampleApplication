import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ObiettiviInd } from './obiettivi-ind.model';
import { ObiettiviIndPopupService } from './obiettivi-ind-popup.service';
import { ObiettiviIndService } from './obiettivi-ind.service';
import { Ind01Indic, Ind01IndicService } from '../ind-01-indic';
import { Ind12Query, Ind12QueryService } from '../ind-12-query';
import { Obiettivi, ObiettiviService } from '../obiettivi';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-obiettivi-ind-dialog',
    templateUrl: './obiettivi-ind-dialog.component.html'
})
export class ObiettiviIndDialogComponent implements OnInit {

    obiettiviInd: ObiettiviInd;
    isSaving: boolean;

    ind01indics: Ind01Indic[];

    ind12queries: Ind12Query[];

    obiettivis: Obiettivi[];
    dtIniDp: any;
    dtFineDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private obiettiviIndService: ObiettiviIndService,
        private ind01IndicService: Ind01IndicService,
        private ind12QueryService: Ind12QueryService,
        private obiettiviService: ObiettiviService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ind01IndicService.query()
            .subscribe((res: ResponseWrapper) => { this.ind01indics = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.ind12QueryService.query()
            .subscribe((res: ResponseWrapper) => { this.ind12queries = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.obiettiviService.query()
            .subscribe((res: ResponseWrapper) => { this.obiettivis = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.obiettiviInd.id !== undefined) {
            this.subscribeToSaveResponse(
                this.obiettiviIndService.update(this.obiettiviInd));
        } else {
            this.subscribeToSaveResponse(
                this.obiettiviIndService.create(this.obiettiviInd));
        }
    }

    private subscribeToSaveResponse(result: Observable<ObiettiviInd>) {
        result.subscribe((res: ObiettiviInd) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ObiettiviInd) {
        this.eventManager.broadcast({ name: 'obiettiviIndListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackInd01IndicById(index: number, item: Ind01Indic) {
        return item.id;
    }

    trackInd12QueryById(index: number, item: Ind12Query) {
        return item.id;
    }

    trackObiettiviById(index: number, item: Obiettivi) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-obiettivi-ind-popup',
    template: ''
})
export class ObiettiviIndPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private obiettiviIndPopupService: ObiettiviIndPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.obiettiviIndPopupService
                    .open(ObiettiviIndDialogComponent as Component, params['id']);
            } else {
                this.obiettiviIndPopupService
                    .open(ObiettiviIndDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
