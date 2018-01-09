/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ind01IndicDialogComponent } from '../../../../../../main/webapp/app/entities/ind-01-indic/ind-01-indic-dialog.component';
import { Ind01IndicService } from '../../../../../../main/webapp/app/entities/ind-01-indic/ind-01-indic.service';
import { Ind01Indic } from '../../../../../../main/webapp/app/entities/ind-01-indic/ind-01-indic.model';
import { Ind02StdService } from '../../../../../../main/webapp/app/entities/ind-02-std';
import { Ind04ClassifService } from '../../../../../../main/webapp/app/entities/ind-04-classif';

describe('Component Tests', () => {

    describe('Ind01Indic Management Dialog Component', () => {
        let comp: Ind01IndicDialogComponent;
        let fixture: ComponentFixture<Ind01IndicDialogComponent>;
        let service: Ind01IndicService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ind01IndicDialogComponent],
                providers: [
                    Ind02StdService,
                    Ind04ClassifService,
                    Ind01IndicService
                ]
            })
            .overrideTemplate(Ind01IndicDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ind01IndicDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ind01IndicService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ind01Indic(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.ind01Indic = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ind01IndicListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ind01Indic();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.ind01Indic = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ind01IndicListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
