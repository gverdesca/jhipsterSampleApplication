import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WidgetImpl } from './widget-impl.model';
import { WidgetImplPopupService } from './widget-impl-popup.service';
import { WidgetImplService } from './widget-impl.service';

@Component({
    selector: 'jhi-widget-impl-dialog',
    templateUrl: './widget-impl-dialog.component.html'
})
export class WidgetImplDialogComponent implements OnInit {

    widgetImpl: WidgetImpl;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private widgetImplService: WidgetImplService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.widgetImpl.id !== undefined) {
            this.subscribeToSaveResponse(
                this.widgetImplService.update(this.widgetImpl));
        } else {
            this.subscribeToSaveResponse(
                this.widgetImplService.create(this.widgetImpl));
        }
    }

    private subscribeToSaveResponse(result: Observable<WidgetImpl>) {
        result.subscribe((res: WidgetImpl) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: WidgetImpl) {
        this.eventManager.broadcast({ name: 'widgetImplListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-widget-impl-popup',
    template: ''
})
export class WidgetImplPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private widgetImplPopupService: WidgetImplPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.widgetImplPopupService
                    .open(WidgetImplDialogComponent as Component, params['id']);
            } else {
                this.widgetImplPopupService
                    .open(WidgetImplDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
