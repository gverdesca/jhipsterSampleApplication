import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ind12Query } from './ind-12-query.model';
import { Ind12QueryPopupService } from './ind-12-query-popup.service';
import { Ind12QueryService } from './ind-12-query.service';
import { Datasource, DatasourceService } from '../datasource';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ind-12-query-dialog',
    templateUrl: './ind-12-query-dialog.component.html'
})
export class Ind12QueryDialogComponent implements OnInit {

    ind12Query: Ind12Query;
    isSaving: boolean;

    datasources: Datasource[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ind12QueryService: Ind12QueryService,
        private datasourceService: DatasourceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.datasourceService.query()
            .subscribe((res: ResponseWrapper) => { this.datasources = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ind12Query.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ind12QueryService.update(this.ind12Query));
        } else {
            this.subscribeToSaveResponse(
                this.ind12QueryService.create(this.ind12Query));
        }
    }

    private subscribeToSaveResponse(result: Observable<Ind12Query>) {
        result.subscribe((res: Ind12Query) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Ind12Query) {
        this.eventManager.broadcast({ name: 'ind12QueryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDatasourceById(index: number, item: Datasource) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ind-12-query-popup',
    template: ''
})
export class Ind12QueryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ind12QueryPopupService: Ind12QueryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ind12QueryPopupService
                    .open(Ind12QueryDialogComponent as Component, params['id']);
            } else {
                this.ind12QueryPopupService
                    .open(Ind12QueryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
