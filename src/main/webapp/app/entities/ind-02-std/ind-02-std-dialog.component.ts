import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ind02Std } from './ind-02-std.model';
import { Ind02StdPopupService } from './ind-02-std-popup.service';
import { Ind02StdService } from './ind-02-std.service';

@Component({
    selector: 'jhi-ind-02-std-dialog',
    templateUrl: './ind-02-std-dialog.component.html'
})
export class Ind02StdDialogComponent implements OnInit {

    ind02Std: Ind02Std;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private ind02StdService: Ind02StdService,
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
        if (this.ind02Std.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ind02StdService.update(this.ind02Std));
        } else {
            this.subscribeToSaveResponse(
                this.ind02StdService.create(this.ind02Std));
        }
    }

    private subscribeToSaveResponse(result: Observable<Ind02Std>) {
        result.subscribe((res: Ind02Std) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Ind02Std) {
        this.eventManager.broadcast({ name: 'ind02StdListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-ind-02-std-popup',
    template: ''
})
export class Ind02StdPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ind02StdPopupService: Ind02StdPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ind02StdPopupService
                    .open(Ind02StdDialogComponent as Component, params['id']);
            } else {
                this.ind02StdPopupService
                    .open(Ind02StdDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
