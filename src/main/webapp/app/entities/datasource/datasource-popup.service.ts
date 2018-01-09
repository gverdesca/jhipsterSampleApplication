import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Datasource } from './datasource.model';
import { DatasourceService } from './datasource.service';

@Injectable()
export class DatasourcePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private datasourceService: DatasourceService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.datasourceService.find(id).subscribe((datasource) => {
                    if (datasource.tsCreaz) {
                        datasource.tsCreaz = {
                            year: datasource.tsCreaz.getFullYear(),
                            month: datasource.tsCreaz.getMonth() + 1,
                            day: datasource.tsCreaz.getDate()
                        };
                    }
                    if (datasource.tsModif) {
                        datasource.tsModif = {
                            year: datasource.tsModif.getFullYear(),
                            month: datasource.tsModif.getMonth() + 1,
                            day: datasource.tsModif.getDate()
                        };
                    }
                    this.ngbModalRef = this.datasourceModalRef(component, datasource);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.datasourceModalRef(component, new Datasource());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    datasourceModalRef(component: Component, datasource: Datasource): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.datasource = datasource;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
