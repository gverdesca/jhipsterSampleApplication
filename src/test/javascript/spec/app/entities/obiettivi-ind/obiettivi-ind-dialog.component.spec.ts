/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ObiettiviIndDialogComponent } from '../../../../../../main/webapp/app/entities/obiettivi-ind/obiettivi-ind-dialog.component';
import { ObiettiviIndService } from '../../../../../../main/webapp/app/entities/obiettivi-ind/obiettivi-ind.service';
import { ObiettiviInd } from '../../../../../../main/webapp/app/entities/obiettivi-ind/obiettivi-ind.model';
import { Ind01IndicService } from '../../../../../../main/webapp/app/entities/ind-01-indic';
import { Ind12QueryService } from '../../../../../../main/webapp/app/entities/ind-12-query';
import { ObiettiviService } from '../../../../../../main/webapp/app/entities/obiettivi';

describe('Component Tests', () => {

    describe('ObiettiviInd Management Dialog Component', () => {
        let comp: ObiettiviIndDialogComponent;
        let fixture: ComponentFixture<ObiettiviIndDialogComponent>;
        let service: ObiettiviIndService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ObiettiviIndDialogComponent],
                providers: [
                    Ind01IndicService,
                    Ind12QueryService,
                    ObiettiviService,
                    ObiettiviIndService
                ]
            })
            .overrideTemplate(ObiettiviIndDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ObiettiviIndDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ObiettiviIndService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ObiettiviInd(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.obiettiviInd = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'obiettiviIndListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ObiettiviInd();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.obiettiviInd = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'obiettiviIndListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
