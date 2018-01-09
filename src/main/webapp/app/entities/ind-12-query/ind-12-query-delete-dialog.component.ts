import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ind12Query } from './ind-12-query.model';
import { Ind12QueryPopupService } from './ind-12-query-popup.service';
import { Ind12QueryService } from './ind-12-query.service';

@Component({
    selector: 'jhi-ind-12-query-delete-dialog',
    templateUrl: './ind-12-query-delete-dialog.component.html'
})
export class Ind12QueryDeleteDialogComponent {

    ind12Query: Ind12Query;

    constructor(
        private ind12QueryService: Ind12QueryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ind12QueryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ind12QueryListModification',
                content: 'Deleted an ind12Query'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ind-12-query-delete-popup',
    template: ''
})
export class Ind12QueryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ind12QueryPopupService: Ind12QueryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ind12QueryPopupService
                .open(Ind12QueryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
