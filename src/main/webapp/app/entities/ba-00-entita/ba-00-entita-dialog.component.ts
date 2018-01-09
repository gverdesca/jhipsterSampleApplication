import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ba00Entita } from './ba-00-entita.model';
import { Ba00EntitaPopupService } from './ba-00-entita-popup.service';
import { Ba00EntitaService } from './ba-00-entita.service';

@Component({
    selector: 'jhi-ba-00-entita-dialog',
    templateUrl: './ba-00-entita-dialog.component.html'
})
export class Ba00EntitaDialogComponent implements OnInit {

    ba00Entita: Ba00Entita;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private ba00EntitaService: Ba00EntitaService,
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
        if (this.ba00Entita.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ba00EntitaService.update(this.ba00Entita));
        } else {
            this.subscribeToSaveResponse(
                this.ba00EntitaService.create(this.ba00Entita));
        }
    }

    private subscribeToSaveResponse(result: Observable<Ba00Entita>) {
        result.subscribe((res: Ba00Entita) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Ba00Entita) {
        this.eventManager.broadcast({ name: 'ba00EntitaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-ba-00-entita-popup',
    template: ''
})
export class Ba00EntitaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ba00EntitaPopupService: Ba00EntitaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ba00EntitaPopupService
                    .open(Ba00EntitaDialogComponent as Component, params['id']);
            } else {
                this.ba00EntitaPopupService
                    .open(Ba00EntitaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
