/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ind12QueryDialogComponent } from '../../../../../../main/webapp/app/entities/ind-12-query/ind-12-query-dialog.component';
import { Ind12QueryService } from '../../../../../../main/webapp/app/entities/ind-12-query/ind-12-query.service';
import { Ind12Query } from '../../../../../../main/webapp/app/entities/ind-12-query/ind-12-query.model';
import { DatasourceService } from '../../../../../../main/webapp/app/entities/datasource';

describe('Component Tests', () => {

    describe('Ind12Query Management Dialog Component', () => {
        let comp: Ind12QueryDialogComponent;
        let fixture: ComponentFixture<Ind12QueryDialogComponent>;
        let service: Ind12QueryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ind12QueryDialogComponent],
                providers: [
                    DatasourceService,
                    Ind12QueryService
                ]
            })
            .overrideTemplate(Ind12QueryDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ind12QueryDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ind12QueryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ind12Query(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.ind12Query = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ind12QueryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ind12Query();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.ind12Query = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ind12QueryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
