/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TipiWidgetDialogComponent } from '../../../../../../main/webapp/app/entities/tipi-widget/tipi-widget-dialog.component';
import { TipiWidgetService } from '../../../../../../main/webapp/app/entities/tipi-widget/tipi-widget.service';
import { TipiWidget } from '../../../../../../main/webapp/app/entities/tipi-widget/tipi-widget.model';
import { WidgetImplService } from '../../../../../../main/webapp/app/entities/widget-impl';

describe('Component Tests', () => {

    describe('TipiWidget Management Dialog Component', () => {
        let comp: TipiWidgetDialogComponent;
        let fixture: ComponentFixture<TipiWidgetDialogComponent>;
        let service: TipiWidgetService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TipiWidgetDialogComponent],
                providers: [
                    WidgetImplService,
                    TipiWidgetService
                ]
            })
            .overrideTemplate(TipiWidgetDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipiWidgetDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipiWidgetService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TipiWidget(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tipiWidget = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tipiWidgetListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TipiWidget();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tipiWidget = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tipiWidgetListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
