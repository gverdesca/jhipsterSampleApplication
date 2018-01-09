/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { DatasourceDialogComponent } from '../../../../../../main/webapp/app/entities/datasource/datasource-dialog.component';
import { DatasourceService } from '../../../../../../main/webapp/app/entities/datasource/datasource.service';
import { Datasource } from '../../../../../../main/webapp/app/entities/datasource/datasource.model';
import { Ba01UtenteService } from '../../../../../../main/webapp/app/entities/ba-01-utente';

describe('Component Tests', () => {

    describe('Datasource Management Dialog Component', () => {
        let comp: DatasourceDialogComponent;
        let fixture: ComponentFixture<DatasourceDialogComponent>;
        let service: DatasourceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [DatasourceDialogComponent],
                providers: [
                    Ba01UtenteService,
                    DatasourceService
                ]
            })
            .overrideTemplate(DatasourceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DatasourceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DatasourceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Datasource(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.datasource = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'datasourceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Datasource();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.datasource = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'datasourceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
