import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MondrianDs } from './mondrian-ds.model';
import { MondrianDsPopupService } from './mondrian-ds-popup.service';
import { MondrianDsService } from './mondrian-ds.service';

@Component({
    selector: 'jhi-mondrian-ds-delete-dialog',
    templateUrl: './mondrian-ds-delete-dialog.component.html'
})
export class MondrianDsDeleteDialogComponent {

    mondrianDs: MondrianDs;

    constructor(
        private mondrianDsService: MondrianDsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mondrianDsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mondrianDsListModification',
                content: 'Deleted an mondrianDs'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mondrian-ds-delete-popup',
    template: ''
})
export class MondrianDsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mondrianDsPopupService: MondrianDsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mondrianDsPopupService
                .open(MondrianDsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
