import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ObiettiviInd } from './obiettivi-ind.model';
import { ObiettiviIndService } from './obiettivi-ind.service';

@Injectable()
export class ObiettiviIndPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private obiettiviIndService: ObiettiviIndService

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
                this.obiettiviIndService.find(id).subscribe((obiettiviInd) => {
                    if (obiettiviInd.dtIni) {
                        obiettiviInd.dtIni = {
                            year: obiettiviInd.dtIni.getFullYear(),
                            month: obiettiviInd.dtIni.getMonth() + 1,
                            day: obiettiviInd.dtIni.getDate()
                        };
                    }
                    if (obiettiviInd.dtFine) {
                        obiettiviInd.dtFine = {
                            year: obiettiviInd.dtFine.getFullYear(),
                            month: obiettiviInd.dtFine.getMonth() + 1,
                            day: obiettiviInd.dtFine.getDate()
                        };
                    }
                    this.ngbModalRef = this.obiettiviIndModalRef(component, obiettiviInd);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.obiettiviIndModalRef(component, new ObiettiviInd());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    obiettiviIndModalRef(component: Component, obiettiviInd: ObiettiviInd): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.obiettiviInd = obiettiviInd;
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
