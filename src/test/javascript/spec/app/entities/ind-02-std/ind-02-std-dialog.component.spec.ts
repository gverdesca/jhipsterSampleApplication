/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ind02StdDialogComponent } from '../../../../../../main/webapp/app/entities/ind-02-std/ind-02-std-dialog.component';
import { Ind02StdService } from '../../../../../../main/webapp/app/entities/ind-02-std/ind-02-std.service';
import { Ind02Std } from '../../../../../../main/webapp/app/entities/ind-02-std/ind-02-std.model';

describe('Component Tests', () => {

    describe('Ind02Std Management Dialog Component', () => {
        let comp: Ind02StdDialogComponent;
        let fixture: ComponentFixture<Ind02StdDialogComponent>;
        let service: Ind02StdService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ind02StdDialogComponent],
                providers: [
                    Ind02StdService
                ]
            })
            .overrideTemplate(Ind02StdDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ind02StdDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ind02StdService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ind02Std(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.ind02Std = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ind02StdListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ind02Std();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.ind02Std = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ind02StdListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
