import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ObiettiviInd } from './obiettivi-ind.model';
import { ObiettiviIndPopupService } from './obiettivi-ind-popup.service';
import { ObiettiviIndService } from './obiettivi-ind.service';

@Component({
    selector: 'jhi-obiettivi-ind-delete-dialog',
    templateUrl: './obiettivi-ind-delete-dialog.component.html'
})
export class ObiettiviIndDeleteDialogComponent {

    obiettiviInd: ObiettiviInd;

    constructor(
        private obiettiviIndService: ObiettiviIndService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.obiettiviIndService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'obiettiviIndListModification',
                content: 'Deleted an obiettiviInd'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-obiettivi-ind-delete-popup',
    template: ''
})
export class ObiettiviIndDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private obiettiviIndPopupService: ObiettiviIndPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.obiettiviIndPopupService
                .open(ObiettiviIndDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
