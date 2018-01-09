import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Obi02IndicValu } from './obi-02-indic-valu.model';
import { Obi02IndicValuPopupService } from './obi-02-indic-valu-popup.service';
import { Obi02IndicValuService } from './obi-02-indic-valu.service';

@Component({
    selector: 'jhi-obi-02-indic-valu-dialog',
    templateUrl: './obi-02-indic-valu-dialog.component.html'
})
export class Obi02IndicValuDialogComponent implements OnInit {

    obi02IndicValu: Obi02IndicValu;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private obi02IndicValuService: Obi02IndicValuService,
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
        if (this.obi02IndicValu.id !== undefined) {
            this.subscribeToSaveResponse(
                this.obi02IndicValuService.update(this.obi02IndicValu));
        } else {
            this.subscribeToSaveResponse(
                this.obi02IndicValuService.create(this.obi02IndicValu));
        }
    }

    private subscribeToSaveResponse(result: Observable<Obi02IndicValu>) {
        result.subscribe((res: Obi02IndicValu) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Obi02IndicValu) {
        this.eventManager.broadcast({ name: 'obi02IndicValuListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-obi-02-indic-valu-popup',
    template: ''
})
export class Obi02IndicValuPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private obi02IndicValuPopupService: Obi02IndicValuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.obi02IndicValuPopupService
                    .open(Obi02IndicValuDialogComponent as Component, params['id']);
            } else {
                this.obi02IndicValuPopupService
                    .open(Obi02IndicValuDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
