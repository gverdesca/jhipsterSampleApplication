import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IndicValu } from './indic-valu.model';
import { IndicValuPopupService } from './indic-valu-popup.service';
import { IndicValuService } from './indic-valu.service';
import { ObiettiviInd, ObiettiviIndService } from '../obiettivi-ind';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-indic-valu-dialog',
    templateUrl: './indic-valu-dialog.component.html'
})
export class IndicValuDialogComponent implements OnInit {

    indicValu: IndicValu;
    isSaving: boolean;

    obiettiviinds: ObiettiviInd[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private indicValuService: IndicValuService,
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
        if (this.indicValu.id !== undefined) {
            this.subscribeToSaveResponse(
                this.indicValuService.update(this.indicValu));
        } else {
            this.subscribeToSaveResponse(
                this.indicValuService.create(this.indicValu));
        }
    }

    private subscribeToSaveResponse(result: Observable<IndicValu>) {
        result.subscribe((res: IndicValu) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: IndicValu) {
        this.eventManager.broadcast({ name: 'indicValuListModification', content: 'OK'});
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
    selector: 'jhi-indic-valu-popup',
    template: ''
})
export class IndicValuPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private indicValuPopupService: IndicValuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.indicValuPopupService
                    .open(IndicValuDialogComponent as Component, params['id']);
            } else {
                this.indicValuPopupService
                    .open(IndicValuDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
