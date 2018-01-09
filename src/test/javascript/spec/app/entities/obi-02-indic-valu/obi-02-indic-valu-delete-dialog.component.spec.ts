/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Obi02IndicValuDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/obi-02-indic-valu/obi-02-indic-valu-delete-dialog.component';
import { Obi02IndicValuService } from '../../../../../../main/webapp/app/entities/obi-02-indic-valu/obi-02-indic-valu.service';

describe('Component Tests', () => {

    describe('Obi02IndicValu Management Delete Component', () => {
        let comp: Obi02IndicValuDeleteDialogComponent;
        let fixture: ComponentFixture<Obi02IndicValuDeleteDialogComponent>;
        let service: Obi02IndicValuService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Obi02IndicValuDeleteDialogComponent],
                providers: [
                    Obi02IndicValuService
                ]
            })
            .overrideTemplate(Obi02IndicValuDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Obi02IndicValuDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Obi02IndicValuService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
