/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { IndicValuDialogComponent } from '../../../../../../main/webapp/app/entities/indic-valu/indic-valu-dialog.component';
import { IndicValuService } from '../../../../../../main/webapp/app/entities/indic-valu/indic-valu.service';
import { IndicValu } from '../../../../../../main/webapp/app/entities/indic-valu/indic-valu.model';
import { ObiettiviIndService } from '../../../../../../main/webapp/app/entities/obiettivi-ind';

describe('Component Tests', () => {

    describe('IndicValu Management Dialog Component', () => {
        let comp: IndicValuDialogComponent;
        let fixture: ComponentFixture<IndicValuDialogComponent>;
        let service: IndicValuService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [IndicValuDialogComponent],
                providers: [
                    ObiettiviIndService,
                    IndicValuService
                ]
            })
            .overrideTemplate(IndicValuDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IndicValuDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IndicValuService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new IndicValu(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.indicValu = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'indicValuListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new IndicValu();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.indicValu = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'indicValuListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
