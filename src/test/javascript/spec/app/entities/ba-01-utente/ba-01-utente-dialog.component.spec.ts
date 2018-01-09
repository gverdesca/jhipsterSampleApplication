/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ba01UtenteDialogComponent } from '../../../../../../main/webapp/app/entities/ba-01-utente/ba-01-utente-dialog.component';
import { Ba01UtenteService } from '../../../../../../main/webapp/app/entities/ba-01-utente/ba-01-utente.service';
import { Ba01Utente } from '../../../../../../main/webapp/app/entities/ba-01-utente/ba-01-utente.model';
import { Ba00EntitaService } from '../../../../../../main/webapp/app/entities/ba-00-entita';

describe('Component Tests', () => {

    describe('Ba01Utente Management Dialog Component', () => {
        let comp: Ba01UtenteDialogComponent;
        let fixture: ComponentFixture<Ba01UtenteDialogComponent>;
        let service: Ba01UtenteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ba01UtenteDialogComponent],
                providers: [
                    Ba00EntitaService,
                    Ba01UtenteService
                ]
            })
            .overrideTemplate(Ba01UtenteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ba01UtenteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ba01UtenteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ba01Utente(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.ba01Utente = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ba01UtenteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ba01Utente();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.ba01Utente = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ba01UtenteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
