/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { MondrianDsDialogComponent } from '../../../../../../main/webapp/app/entities/mondrian-ds/mondrian-ds-dialog.component';
import { MondrianDsService } from '../../../../../../main/webapp/app/entities/mondrian-ds/mondrian-ds.service';
import { MondrianDs } from '../../../../../../main/webapp/app/entities/mondrian-ds/mondrian-ds.model';
import { DatasourceService } from '../../../../../../main/webapp/app/entities/datasource';
import { Ind01IndicService } from '../../../../../../main/webapp/app/entities/ind-01-indic';

describe('Component Tests', () => {

    describe('MondrianDs Management Dialog Component', () => {
        let comp: MondrianDsDialogComponent;
        let fixture: ComponentFixture<MondrianDsDialogComponent>;
        let service: MondrianDsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [MondrianDsDialogComponent],
                providers: [
                    DatasourceService,
                    Ind01IndicService,
                    MondrianDsService
                ]
            })
            .overrideTemplate(MondrianDsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MondrianDsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MondrianDsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MondrianDs(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.mondrianDs = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'mondrianDsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MondrianDs();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.mondrianDs = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'mondrianDsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
