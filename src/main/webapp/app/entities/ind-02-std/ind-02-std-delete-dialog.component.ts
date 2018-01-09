import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ind02Std } from './ind-02-std.model';
import { Ind02StdPopupService } from './ind-02-std-popup.service';
import { Ind02StdService } from './ind-02-std.service';

@Component({
    selector: 'jhi-ind-02-std-delete-dialog',
    templateUrl: './ind-02-std-delete-dialog.component.html'
})
export class Ind02StdDeleteDialogComponent {

    ind02Std: Ind02Std;

    constructor(
        private ind02StdService: Ind02StdService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ind02StdService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ind02StdListModification',
                content: 'Deleted an ind02Std'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ind-02-std-delete-popup',
    template: ''
})
export class Ind02StdDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ind02StdPopupService: Ind02StdPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ind02StdPopupService
                .open(Ind02StdDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
