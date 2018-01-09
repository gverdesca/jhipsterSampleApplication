/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ba00EntitaDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/ba-00-entita/ba-00-entita-delete-dialog.component';
import { Ba00EntitaService } from '../../../../../../main/webapp/app/entities/ba-00-entita/ba-00-entita.service';

describe('Component Tests', () => {

    describe('Ba00Entita Management Delete Component', () => {
        let comp: Ba00EntitaDeleteDialogComponent;
        let fixture: ComponentFixture<Ba00EntitaDeleteDialogComponent>;
        let service: Ba00EntitaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ba00EntitaDeleteDialogComponent],
                providers: [
                    Ba00EntitaService
                ]
            })
            .overrideTemplate(Ba00EntitaDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ba00EntitaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ba00EntitaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
