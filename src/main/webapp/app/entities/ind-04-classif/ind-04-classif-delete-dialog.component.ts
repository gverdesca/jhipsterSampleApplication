import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ind04Classif } from './ind-04-classif.model';
import { Ind04ClassifPopupService } from './ind-04-classif-popup.service';
import { Ind04ClassifService } from './ind-04-classif.service';

@Component({
    selector: 'jhi-ind-04-classif-delete-dialog',
    templateUrl: './ind-04-classif-delete-dialog.component.html'
})
export class Ind04ClassifDeleteDialogComponent {

    ind04Classif: Ind04Classif;

    constructor(
        private ind04ClassifService: Ind04ClassifService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ind04ClassifService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ind04ClassifListModification',
                content: 'Deleted an ind04Classif'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ind-04-classif-delete-popup',
    template: ''
})
export class Ind04ClassifDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ind04ClassifPopupService: Ind04ClassifPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ind04ClassifPopupService
                .open(Ind04ClassifDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
