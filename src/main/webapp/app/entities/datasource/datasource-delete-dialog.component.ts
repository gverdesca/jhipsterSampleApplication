import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Datasource } from './datasource.model';
import { DatasourcePopupService } from './datasource-popup.service';
import { DatasourceService } from './datasource.service';

@Component({
    selector: 'jhi-datasource-delete-dialog',
    templateUrl: './datasource-delete-dialog.component.html'
})
export class DatasourceDeleteDialogComponent {

    datasource: Datasource;

    constructor(
        private datasourceService: DatasourceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.datasourceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'datasourceListModification',
                content: 'Deleted an datasource'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-datasource-delete-popup',
    template: ''
})
export class DatasourceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private datasourcePopupService: DatasourcePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.datasourcePopupService
                .open(DatasourceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
