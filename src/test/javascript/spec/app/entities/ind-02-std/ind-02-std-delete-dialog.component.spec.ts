/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ind02StdDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/ind-02-std/ind-02-std-delete-dialog.component';
import { Ind02StdService } from '../../../../../../main/webapp/app/entities/ind-02-std/ind-02-std.service';

describe('Component Tests', () => {

    describe('Ind02Std Management Delete Component', () => {
        let comp: Ind02StdDeleteDialogComponent;
        let fixture: ComponentFixture<Ind02StdDeleteDialogComponent>;
        let service: Ind02StdService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ind02StdDeleteDialogComponent],
                providers: [
                    Ind02StdService
                ]
            })
            .overrideTemplate(Ind02StdDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ind02StdDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ind02StdService);
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
