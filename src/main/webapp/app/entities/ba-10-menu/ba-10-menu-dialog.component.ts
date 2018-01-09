import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ba10Menu } from './ba-10-menu.model';
import { Ba10MenuPopupService } from './ba-10-menu-popup.service';
import { Ba10MenuService } from './ba-10-menu.service';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ba-10-menu-dialog',
    templateUrl: './ba-10-menu-dialog.component.html'
})
export class Ba10MenuDialogComponent implements OnInit {

    ba10Menu: Ba10Menu;
    isSaving: boolean;

    ba10menus: Ba10Menu[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ba10MenuService: Ba10MenuService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ba10MenuService.query()
            .subscribe((res: ResponseWrapper) => { this.ba10menus = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ba10Menu.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ba10MenuService.update(this.ba10Menu));
        } else {
            this.subscribeToSaveResponse(
                this.ba10MenuService.create(this.ba10Menu));
        }
    }

    private subscribeToSaveResponse(result: Observable<Ba10Menu>) {
        result.subscribe((res: Ba10Menu) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Ba10Menu) {
        this.eventManager.broadcast({ name: 'ba10MenuListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBa10MenuById(index: number, item: Ba10Menu) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ba-10-menu-popup',
    template: ''
})
export class Ba10MenuPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ba10MenuPopupService: Ba10MenuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ba10MenuPopupService
                    .open(Ba10MenuDialogComponent as Component, params['id']);
            } else {
                this.ba10MenuPopupService
                    .open(Ba10MenuDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
