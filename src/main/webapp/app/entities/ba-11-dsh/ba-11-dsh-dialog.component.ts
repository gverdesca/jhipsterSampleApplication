import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ba11Dsh } from './ba-11-dsh.model';
import { Ba11DshPopupService } from './ba-11-dsh-popup.service';
import { Ba11DshService } from './ba-11-dsh.service';
import { Ba01Utente, Ba01UtenteService } from '../ba-01-utente';
import { Ba10Menu, Ba10MenuService } from '../ba-10-menu';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ba-11-dsh-dialog',
    templateUrl: './ba-11-dsh-dialog.component.html'
})
export class Ba11DshDialogComponent implements OnInit {

    ba11Dsh: Ba11Dsh;
    isSaving: boolean;

    ba01utentes: Ba01Utente[];

    ba10menus: Ba10Menu[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ba11DshService: Ba11DshService,
        private ba01UtenteService: Ba01UtenteService,
        private ba10MenuService: Ba10MenuService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ba01UtenteService.query()
            .subscribe((res: ResponseWrapper) => { this.ba01utentes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.ba10MenuService.query()
            .subscribe((res: ResponseWrapper) => { this.ba10menus = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ba11Dsh.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ba11DshService.update(this.ba11Dsh));
        } else {
            this.subscribeToSaveResponse(
                this.ba11DshService.create(this.ba11Dsh));
        }
    }

    private subscribeToSaveResponse(result: Observable<Ba11Dsh>) {
        result.subscribe((res: Ba11Dsh) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Ba11Dsh) {
        this.eventManager.broadcast({ name: 'ba11DshListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBa01UtenteById(index: number, item: Ba01Utente) {
        return item.id;
    }

    trackBa10MenuById(index: number, item: Ba10Menu) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ba-11-dsh-popup',
    template: ''
})
export class Ba11DshPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ba11DshPopupService: Ba11DshPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ba11DshPopupService
                    .open(Ba11DshDialogComponent as Component, params['id']);
            } else {
                this.ba11DshPopupService
                    .open(Ba11DshDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
