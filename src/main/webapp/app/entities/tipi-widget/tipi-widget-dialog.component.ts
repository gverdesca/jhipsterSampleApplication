import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TipiWidget } from './tipi-widget.model';
import { TipiWidgetPopupService } from './tipi-widget-popup.service';
import { TipiWidgetService } from './tipi-widget.service';
import { WidgetImpl, WidgetImplService } from '../widget-impl';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tipi-widget-dialog',
    templateUrl: './tipi-widget-dialog.component.html'
})
export class TipiWidgetDialogComponent implements OnInit {

    tipiWidget: TipiWidget;
    isSaving: boolean;

    widgetimpls: WidgetImpl[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipiWidgetService: TipiWidgetService,
        private widgetImplService: WidgetImplService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.widgetImplService
            .query({filter: 'tipiwidget-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.tipiWidget.widgetImpl || !this.tipiWidget.widgetImpl.id) {
                    this.widgetimpls = res.json;
                } else {
                    this.widgetImplService
                        .find(this.tipiWidget.widgetImpl.id)
                        .subscribe((subRes: WidgetImpl) => {
                            this.widgetimpls = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tipiWidget.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipiWidgetService.update(this.tipiWidget));
        } else {
            this.subscribeToSaveResponse(
                this.tipiWidgetService.create(this.tipiWidget));
        }
    }

    private subscribeToSaveResponse(result: Observable<TipiWidget>) {
        result.subscribe((res: TipiWidget) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TipiWidget) {
        this.eventManager.broadcast({ name: 'tipiWidgetListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackWidgetImplById(index: number, item: WidgetImpl) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tipi-widget-popup',
    template: ''
})
export class TipiWidgetPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipiWidgetPopupService: TipiWidgetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipiWidgetPopupService
                    .open(TipiWidgetDialogComponent as Component, params['id']);
            } else {
                this.tipiWidgetPopupService
                    .open(TipiWidgetDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
