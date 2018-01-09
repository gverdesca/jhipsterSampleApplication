/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ba10MenuDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/ba-10-menu/ba-10-menu-delete-dialog.component';
import { Ba10MenuService } from '../../../../../../main/webapp/app/entities/ba-10-menu/ba-10-menu.service';

describe('Component Tests', () => {

    describe('Ba10Menu Management Delete Component', () => {
        let comp: Ba10MenuDeleteDialogComponent;
        let fixture: ComponentFixture<Ba10MenuDeleteDialogComponent>;
        let service: Ba10MenuService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ba10MenuDeleteDialogComponent],
                providers: [
                    Ba10MenuService
                ]
            })
            .overrideTemplate(Ba10MenuDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ba10MenuDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ba10MenuService);
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
