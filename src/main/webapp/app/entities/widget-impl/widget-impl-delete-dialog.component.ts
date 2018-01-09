import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WidgetImpl } from './widget-impl.model';
import { WidgetImplPopupService } from './widget-impl-popup.service';
import { WidgetImplService } from './widget-impl.service';

@Component({
    selector: 'jhi-widget-impl-delete-dialog',
    templateUrl: './widget-impl-delete-dialog.component.html'
})
export class WidgetImplDeleteDialogComponent {

    widgetImpl: WidgetImpl;

    constructor(
        private widgetImplService: WidgetImplService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.widgetImplService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'widgetImplListModification',
                content: 'Deleted an widgetImpl'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-widget-impl-delete-popup',
    template: ''
})
export class WidgetImplDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private widgetImplPopupService: WidgetImplPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.widgetImplPopupService
                .open(WidgetImplDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
