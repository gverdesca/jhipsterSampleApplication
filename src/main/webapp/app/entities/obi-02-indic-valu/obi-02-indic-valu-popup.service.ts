import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Obi02IndicValu } from './obi-02-indic-valu.model';
import { Obi02IndicValuService } from './obi-02-indic-valu.service';

@Injectable()
export class Obi02IndicValuPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private obi02IndicValuService: Obi02IndicValuService

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
                this.obi02IndicValuService.find(id).subscribe((obi02IndicValu) => {
                    this.ngbModalRef = this.obi02IndicValuModalRef(component, obi02IndicValu);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.obi02IndicValuModalRef(component, new Obi02IndicValu());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    obi02IndicValuModalRef(component: Component, obi02IndicValu: Obi02IndicValu): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.obi02IndicValu = obi02IndicValu;
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
