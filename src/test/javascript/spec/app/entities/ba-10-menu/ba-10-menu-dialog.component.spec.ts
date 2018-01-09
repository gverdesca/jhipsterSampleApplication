/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ba10MenuDialogComponent } from '../../../../../../main/webapp/app/entities/ba-10-menu/ba-10-menu-dialog.component';
import { Ba10MenuService } from '../../../../../../main/webapp/app/entities/ba-10-menu/ba-10-menu.service';
import { Ba10Menu } from '../../../../../../main/webapp/app/entities/ba-10-menu/ba-10-menu.model';

describe('Component Tests', () => {

    describe('Ba10Menu Management Dialog Component', () => {
        let comp: Ba10MenuDialogComponent;
        let fixture: ComponentFixture<Ba10MenuDialogComponent>;
        let service: Ba10MenuService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ba10MenuDialogComponent],
                providers: [
                    Ba10MenuService
                ]
            })
            .overrideTemplate(Ba10MenuDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ba10MenuDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ba10MenuService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ba10Menu(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.ba10Menu = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ba10MenuListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ba10Menu();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.ba10Menu = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ba10MenuListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
