import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MondrianDs } from './mondrian-ds.model';
import { MondrianDsPopupService } from './mondrian-ds-popup.service';
import { MondrianDsService } from './mondrian-ds.service';
import { Datasource, DatasourceService } from '../datasource';
import { Ind01Indic, Ind01IndicService } from '../ind-01-indic';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-mondrian-ds-dialog',
    templateUrl: './mondrian-ds-dialog.component.html'
})
export class MondrianDsDialogComponent implements OnInit {

    mondrianDs: MondrianDs;
    isSaving: boolean;

    datasources: Datasource[];

    ind01indics: Ind01Indic[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private mondrianDsService: MondrianDsService,
        private datasourceService: DatasourceService,
        private ind01IndicService: Ind01IndicService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.datasourceService
            .query({filter: 'mondriands-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.mondrianDs.datasource || !this.mondrianDs.datasource.id) {
                    this.datasources = res.json;
                } else {
                    this.datasourceService
                        .find(this.mondrianDs.datasource.id)
                        .subscribe((subRes: Datasource) => {
                            this.datasources = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.ind01IndicService.query()
            .subscribe((res: ResponseWrapper) => { this.ind01indics = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mondrianDs.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mondrianDsService.update(this.mondrianDs));
        } else {
            this.subscribeToSaveResponse(
                this.mondrianDsService.create(this.mondrianDs));
        }
    }

    private subscribeToSaveResponse(result: Observable<MondrianDs>) {
        result.subscribe((res: MondrianDs) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MondrianDs) {
        this.eventManager.broadcast({ name: 'mondrianDsListModification', content: 'OK'});
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

    trackInd01IndicById(index: number, item: Ind01Indic) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-mondrian-ds-popup',
    template: ''
})
export class MondrianDsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mondrianDsPopupService: MondrianDsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mondrianDsPopupService
                    .open(MondrianDsDialogComponent as Component, params['id']);
            } else {
                this.mondrianDsPopupService
                    .open(MondrianDsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
