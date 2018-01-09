import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ba11Dsh } from './ba-11-dsh.model';
import { Ba11DshPopupService } from './ba-11-dsh-popup.service';
import { Ba11DshService } from './ba-11-dsh.service';

@Component({
    selector: 'jhi-ba-11-dsh-delete-dialog',
    templateUrl: './ba-11-dsh-delete-dialog.component.html'
})
export class Ba11DshDeleteDialogComponent {

    ba11Dsh: Ba11Dsh;

    constructor(
        private ba11DshService: Ba11DshService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ba11DshService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ba11DshListModification',
                content: 'Deleted an ba11Dsh'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ba-11-dsh-delete-popup',
    template: ''
})
export class Ba11DshDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ba11DshPopupService: Ba11DshPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ba11DshPopupService
                .open(Ba11DshDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
