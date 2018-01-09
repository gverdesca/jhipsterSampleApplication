import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ba12Widget } from './ba-12-widget.model';
import { Ba12WidgetPopupService } from './ba-12-widget-popup.service';
import { Ba12WidgetService } from './ba-12-widget.service';

@Component({
    selector: 'jhi-ba-12-widget-delete-dialog',
    templateUrl: './ba-12-widget-delete-dialog.component.html'
})
export class Ba12WidgetDeleteDialogComponent {

    ba12Widget: Ba12Widget;

    constructor(
        private ba12WidgetService: Ba12WidgetService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ba12WidgetService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ba12WidgetListModification',
                content: 'Deleted an ba12Widget'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ba-12-widget-delete-popup',
    template: ''
})
export class Ba12WidgetDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ba12WidgetPopupService: Ba12WidgetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ba12WidgetPopupService
                .open(Ba12WidgetDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
