/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Obi02IndicValuDialogComponent } from '../../../../../../main/webapp/app/entities/obi-02-indic-valu/obi-02-indic-valu-dialog.component';
import { Obi02IndicValuService } from '../../../../../../main/webapp/app/entities/obi-02-indic-valu/obi-02-indic-valu.service';
import { Obi02IndicValu } from '../../../../../../main/webapp/app/entities/obi-02-indic-valu/obi-02-indic-valu.model';

describe('Component Tests', () => {

    describe('Obi02IndicValu Management Dialog Component', () => {
        let comp: Obi02IndicValuDialogComponent;
        let fixture: ComponentFixture<Obi02IndicValuDialogComponent>;
        let service: Obi02IndicValuService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Obi02IndicValuDialogComponent],
                providers: [
                    Obi02IndicValuService
                ]
            })
            .overrideTemplate(Obi02IndicValuDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Obi02IndicValuDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Obi02IndicValuService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Obi02IndicValu(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.obi02IndicValu = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'obi02IndicValuListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Obi02IndicValu();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.obi02IndicValu = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'obi02IndicValuListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
