/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ba11DshDialogComponent } from '../../../../../../main/webapp/app/entities/ba-11-dsh/ba-11-dsh-dialog.component';
import { Ba11DshService } from '../../../../../../main/webapp/app/entities/ba-11-dsh/ba-11-dsh.service';
import { Ba11Dsh } from '../../../../../../main/webapp/app/entities/ba-11-dsh/ba-11-dsh.model';
import { Ba01UtenteService } from '../../../../../../main/webapp/app/entities/ba-01-utente';
import { Ba10MenuService } from '../../../../../../main/webapp/app/entities/ba-10-menu';

describe('Component Tests', () => {

    describe('Ba11Dsh Management Dialog Component', () => {
        let comp: Ba11DshDialogComponent;
        let fixture: ComponentFixture<Ba11DshDialogComponent>;
        let service: Ba11DshService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ba11DshDialogComponent],
                providers: [
                    Ba01UtenteService,
                    Ba10MenuService,
                    Ba11DshService
                ]
            })
            .overrideTemplate(Ba11DshDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ba11DshDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ba11DshService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ba11Dsh(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.ba11Dsh = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ba11DshListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ba11Dsh();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.ba11Dsh = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ba11DshListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
