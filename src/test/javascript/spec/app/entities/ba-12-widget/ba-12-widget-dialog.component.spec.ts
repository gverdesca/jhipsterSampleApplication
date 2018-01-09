/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ba12WidgetDialogComponent } from '../../../../../../main/webapp/app/entities/ba-12-widget/ba-12-widget-dialog.component';
import { Ba12WidgetService } from '../../../../../../main/webapp/app/entities/ba-12-widget/ba-12-widget.service';
import { Ba12Widget } from '../../../../../../main/webapp/app/entities/ba-12-widget/ba-12-widget.model';
import { Ba11DshService } from '../../../../../../main/webapp/app/entities/ba-11-dsh';
import { Ind12QueryService } from '../../../../../../main/webapp/app/entities/ind-12-query';
import { TipiWidgetService } from '../../../../../../main/webapp/app/entities/tipi-widget';

describe('Component Tests', () => {

    describe('Ba12Widget Management Dialog Component', () => {
        let comp: Ba12WidgetDialogComponent;
        let fixture: ComponentFixture<Ba12WidgetDialogComponent>;
        let service: Ba12WidgetService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ba12WidgetDialogComponent],
                providers: [
                    Ba11DshService,
                    Ind12QueryService,
                    TipiWidgetService,
                    Ba12WidgetService
                ]
            })
            .overrideTemplate(Ba12WidgetDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ba12WidgetDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ba12WidgetService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ba12Widget(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.ba12Widget = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ba12WidgetListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ba12Widget();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.ba12Widget = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ba12WidgetListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
