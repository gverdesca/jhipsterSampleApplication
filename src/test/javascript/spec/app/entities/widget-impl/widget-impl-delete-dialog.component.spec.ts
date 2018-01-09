/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { WidgetImplDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/widget-impl/widget-impl-delete-dialog.component';
import { WidgetImplService } from '../../../../../../main/webapp/app/entities/widget-impl/widget-impl.service';

describe('Component Tests', () => {

    describe('WidgetImpl Management Delete Component', () => {
        let comp: WidgetImplDeleteDialogComponent;
        let fixture: ComponentFixture<WidgetImplDeleteDialogComponent>;
        let service: WidgetImplService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [WidgetImplDeleteDialogComponent],
                providers: [
                    WidgetImplService
                ]
            })
            .overrideTemplate(WidgetImplDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WidgetImplDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WidgetImplService);
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
