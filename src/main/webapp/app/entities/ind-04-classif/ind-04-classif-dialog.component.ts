import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ind04Classif } from './ind-04-classif.model';
import { Ind04ClassifPopupService } from './ind-04-classif-popup.service';
import { Ind04ClassifService } from './ind-04-classif.service';

@Component({
    selector: 'jhi-ind-04-classif-dialog',
    templateUrl: './ind-04-classif-dialog.component.html'
})
export class Ind04ClassifDialogComponent implements OnInit {

    ind04Classif: Ind04Classif;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private ind04ClassifService: Ind04ClassifService,
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
        if (this.ind04Classif.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ind04ClassifService.update(this.ind04Classif));
        } else {
            this.subscribeToSaveResponse(
                this.ind04ClassifService.create(this.ind04Classif));
        }
    }

    private subscribeToSaveResponse(result: Observable<Ind04Classif>) {
        result.subscribe((res: Ind04Classif) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Ind04Classif) {
        this.eventManager.broadcast({ name: 'ind04ClassifListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-ind-04-classif-popup',
    template: ''
})
export class Ind04ClassifPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ind04ClassifPopupService: Ind04ClassifPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ind04ClassifPopupService
                    .open(Ind04ClassifDialogComponent as Component, params['id']);
            } else {
                this.ind04ClassifPopupService
                    .open(Ind04ClassifDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
