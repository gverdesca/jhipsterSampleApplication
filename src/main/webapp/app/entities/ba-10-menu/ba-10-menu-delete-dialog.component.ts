import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ba10Menu } from './ba-10-menu.model';
import { Ba10MenuPopupService } from './ba-10-menu-popup.service';
import { Ba10MenuService } from './ba-10-menu.service';

@Component({
    selector: 'jhi-ba-10-menu-delete-dialog',
    templateUrl: './ba-10-menu-delete-dialog.component.html'
})
export class Ba10MenuDeleteDialogComponent {

    ba10Menu: Ba10Menu;

    constructor(
        private ba10MenuService: Ba10MenuService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ba10MenuService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ba10MenuListModification',
                content: 'Deleted an ba10Menu'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ba-10-menu-delete-popup',
    template: ''
})
export class Ba10MenuDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ba10MenuPopupService: Ba10MenuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ba10MenuPopupService
                .open(Ba10MenuDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
