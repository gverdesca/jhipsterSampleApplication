import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ba12Widget } from './ba-12-widget.model';
import { Ba12WidgetPopupService } from './ba-12-widget-popup.service';
import { Ba12WidgetService } from './ba-12-widget.service';
import { Ba11Dsh, Ba11DshService } from '../ba-11-dsh';
import { Ind12Query, Ind12QueryService } from '../ind-12-query';
import { TipiWidget, TipiWidgetService } from '../tipi-widget';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ba-12-widget-dialog',
    templateUrl: './ba-12-widget-dialog.component.html'
})
export class Ba12WidgetDialogComponent implements OnInit {

    ba12Widget: Ba12Widget;
    isSaving: boolean;

    ba11dshes: Ba11Dsh[];

    ind12queries: Ind12Query[];

    tipiwidgets: TipiWidget[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ba12WidgetService: Ba12WidgetService,
        private ba11DshService: Ba11DshService,
        private ind12QueryService: Ind12QueryService,
        private tipiWidgetService: TipiWidgetService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ba11DshService.query()
            .subscribe((res: ResponseWrapper) => { this.ba11dshes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.ind12QueryService.query()
            .subscribe((res: ResponseWrapper) => { this.ind12queries = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipiWidgetService.query()
            .subscribe((res: ResponseWrapper) => { this.tipiwidgets = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ba12Widget.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ba12WidgetService.update(this.ba12Widget));
        } else {
            this.subscribeToSaveResponse(
                this.ba12WidgetService.create(this.ba12Widget));
        }
    }

    private subscribeToSaveResponse(result: Observable<Ba12Widget>) {
        result.subscribe((res: Ba12Widget) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Ba12Widget) {
        this.eventManager.broadcast({ name: 'ba12WidgetListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBa11DshById(index: number, item: Ba11Dsh) {
        return item.id;
    }

    trackInd12QueryById(index: number, item: Ind12Query) {
        return item.id;
    }

    trackTipiWidgetById(index: number, item: TipiWidget) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ba-12-widget-popup',
    template: ''
})
export class Ba12WidgetPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ba12WidgetPopupService: Ba12WidgetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ba12WidgetPopupService
                    .open(Ba12WidgetDialogComponent as Component, params['id']);
            } else {
                this.ba12WidgetPopupService
                    .open(Ba12WidgetDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
