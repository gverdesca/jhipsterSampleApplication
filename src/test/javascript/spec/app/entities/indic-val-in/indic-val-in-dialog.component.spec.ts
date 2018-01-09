/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { IndicValInDialogComponent } from '../../../../../../main/webapp/app/entities/indic-val-in/indic-val-in-dialog.component';
import { IndicValInService } from '../../../../../../main/webapp/app/entities/indic-val-in/indic-val-in.service';
import { IndicValIn } from '../../../../../../main/webapp/app/entities/indic-val-in/indic-val-in.model';
import { ObiettiviIndService } from '../../../../../../main/webapp/app/entities/obiettivi-ind';

describe('Component Tests', () => {

    describe('IndicValIn Management Dialog Component', () => {
        let comp: IndicValInDialogComponent;
        let fixture: ComponentFixture<IndicValInDialogComponent>;
        let service: IndicValInService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [IndicValInDialogComponent],
                providers: [
                    ObiettiviIndService,
                    IndicValInService
                ]
            })
            .overrideTemplate(IndicValInDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IndicValInDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IndicValInService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new IndicValIn(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.indicValIn = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'indicValInListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new IndicValIn();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.indicValIn = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'indicValInListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
