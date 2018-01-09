import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IndicValInt } from './indic-val-int.model';
import { IndicValIntPopupService } from './indic-val-int-popup.service';
import { IndicValIntService } from './indic-val-int.service';
import { ObiettiviInd, ObiettiviIndService } from '../obiettivi-ind';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-indic-val-int-dialog',
    templateUrl: './indic-val-int-dialog.component.html'
})
export class IndicValIntDialogComponent implements OnInit {

    indicValInt: IndicValInt;
    isSaving: boolean;

    obiettiviinds: ObiettiviInd[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private indicValIntService: IndicValIntService,
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
        if (this.indicValInt.id !== undefined) {
            this.subscribeToSaveResponse(
                this.indicValIntService.update(this.indicValInt));
        } else {
            this.subscribeToSaveResponse(
                this.indicValIntService.create(this.indicValInt));
        }
    }

    private subscribeToSaveResponse(result: Observable<IndicValInt>) {
        result.subscribe((res: IndicValInt) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: IndicValInt) {
        this.eventManager.broadcast({ name: 'indicValIntListModification', content: 'OK'});
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
    selector: 'jhi-indic-val-int-popup',
    template: ''
})
export class IndicValIntPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private indicValIntPopupService: IndicValIntPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.indicValIntPopupService
                    .open(IndicValIntDialogComponent as Component, params['id']);
            } else {
                this.indicValIntPopupService
                    .open(IndicValIntDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
