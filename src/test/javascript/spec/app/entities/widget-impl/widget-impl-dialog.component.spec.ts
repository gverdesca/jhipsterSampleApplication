/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { WidgetImplDialogComponent } from '../../../../../../main/webapp/app/entities/widget-impl/widget-impl-dialog.component';
import { WidgetImplService } from '../../../../../../main/webapp/app/entities/widget-impl/widget-impl.service';
import { WidgetImpl } from '../../../../../../main/webapp/app/entities/widget-impl/widget-impl.model';

describe('Component Tests', () => {

    describe('WidgetImpl Management Dialog Component', () => {
        let comp: WidgetImplDialogComponent;
        let fixture: ComponentFixture<WidgetImplDialogComponent>;
        let service: WidgetImplService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [WidgetImplDialogComponent],
                providers: [
                    WidgetImplService
                ]
            })
            .overrideTemplate(WidgetImplDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WidgetImplDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WidgetImplService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WidgetImpl(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.widgetImpl = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'widgetImplListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WidgetImpl();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.widgetImpl = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'widgetImplListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
