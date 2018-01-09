/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ind04ClassifDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/ind-04-classif/ind-04-classif-delete-dialog.component';
import { Ind04ClassifService } from '../../../../../../main/webapp/app/entities/ind-04-classif/ind-04-classif.service';

describe('Component Tests', () => {

    describe('Ind04Classif Management Delete Component', () => {
        let comp: Ind04ClassifDeleteDialogComponent;
        let fixture: ComponentFixture<Ind04ClassifDeleteDialogComponent>;
        let service: Ind04ClassifService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ind04ClassifDeleteDialogComponent],
                providers: [
                    Ind04ClassifService
                ]
            })
            .overrideTemplate(Ind04ClassifDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ind04ClassifDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ind04ClassifService);
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
