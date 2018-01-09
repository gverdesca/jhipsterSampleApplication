import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipiWidget } from './tipi-widget.model';
import { TipiWidgetPopupService } from './tipi-widget-popup.service';
import { TipiWidgetService } from './tipi-widget.service';

@Component({
    selector: 'jhi-tipi-widget-delete-dialog',
    templateUrl: './tipi-widget-delete-dialog.component.html'
})
export class TipiWidgetDeleteDialogComponent {

    tipiWidget: TipiWidget;

    constructor(
        private tipiWidgetService: TipiWidgetService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipiWidgetService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipiWidgetListModification',
                content: 'Deleted an tipiWidget'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipi-widget-delete-popup',
    template: ''
})
export class TipiWidgetDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipiWidgetPopupService: TipiWidgetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipiWidgetPopupService
                .open(TipiWidgetDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
