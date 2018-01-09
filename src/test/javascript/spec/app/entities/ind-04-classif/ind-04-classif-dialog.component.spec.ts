/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ind04ClassifDialogComponent } from '../../../../../../main/webapp/app/entities/ind-04-classif/ind-04-classif-dialog.component';
import { Ind04ClassifService } from '../../../../../../main/webapp/app/entities/ind-04-classif/ind-04-classif.service';
import { Ind04Classif } from '../../../../../../main/webapp/app/entities/ind-04-classif/ind-04-classif.model';

describe('Component Tests', () => {

    describe('Ind04Classif Management Dialog Component', () => {
        let comp: Ind04ClassifDialogComponent;
        let fixture: ComponentFixture<Ind04ClassifDialogComponent>;
        let service: Ind04ClassifService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ind04ClassifDialogComponent],
                providers: [
                    Ind04ClassifService
                ]
            })
            .overrideTemplate(Ind04ClassifDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ind04ClassifDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ind04ClassifService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ind04Classif(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.ind04Classif = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ind04ClassifListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ind04Classif();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.ind04Classif = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ind04ClassifListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
