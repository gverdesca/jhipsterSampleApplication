import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ind01Indic } from './ind-01-indic.model';
import { Ind01IndicPopupService } from './ind-01-indic-popup.service';
import { Ind01IndicService } from './ind-01-indic.service';
import { Ind02Std, Ind02StdService } from '../ind-02-std';
import { Ind04Classif, Ind04ClassifService } from '../ind-04-classif';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ind-01-indic-dialog',
    templateUrl: './ind-01-indic-dialog.component.html'
})
export class Ind01IndicDialogComponent implements OnInit {

    ind01Indic: Ind01Indic;
    isSaving: boolean;

    ind02stds: Ind02Std[];

    ind04classifs: Ind04Classif[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ind01IndicService: Ind01IndicService,
        private ind02StdService: Ind02StdService,
        private ind04ClassifService: Ind04ClassifService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ind02StdService.query()
            .subscribe((res: ResponseWrapper) => { this.ind02stds = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.ind04ClassifService.query()
            .subscribe((res: ResponseWrapper) => { this.ind04classifs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ind01Indic.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ind01IndicService.update(this.ind01Indic));
        } else {
            this.subscribeToSaveResponse(
                this.ind01IndicService.create(this.ind01Indic));
        }
    }

    private subscribeToSaveResponse(result: Observable<Ind01Indic>) {
        result.subscribe((res: Ind01Indic) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Ind01Indic) {
        this.eventManager.broadcast({ name: 'ind01IndicListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackInd02StdById(index: number, item: Ind02Std) {
        return item.id;
    }

    trackInd04ClassifById(index: number, item: Ind04Classif) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ind-01-indic-popup',
    template: ''
})
export class Ind01IndicPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ind01IndicPopupService: Ind01IndicPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ind01IndicPopupService
                    .open(Ind01IndicDialogComponent as Component, params['id']);
            } else {
                this.ind01IndicPopupService
                    .open(Ind01IndicDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
