/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ba00EntitaDialogComponent } from '../../../../../../main/webapp/app/entities/ba-00-entita/ba-00-entita-dialog.component';
import { Ba00EntitaService } from '../../../../../../main/webapp/app/entities/ba-00-entita/ba-00-entita.service';
import { Ba00Entita } from '../../../../../../main/webapp/app/entities/ba-00-entita/ba-00-entita.model';

describe('Component Tests', () => {

    describe('Ba00Entita Management Dialog Component', () => {
        let comp: Ba00EntitaDialogComponent;
        let fixture: ComponentFixture<Ba00EntitaDialogComponent>;
        let service: Ba00EntitaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ba00EntitaDialogComponent],
                providers: [
                    Ba00EntitaService
                ]
            })
            .overrideTemplate(Ba00EntitaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ba00EntitaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ba00EntitaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ba00Entita(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.ba00Entita = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ba00EntitaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ba00Entita();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.ba00Entita = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ba00EntitaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
