/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TipiWidgetDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tipi-widget/tipi-widget-delete-dialog.component';
import { TipiWidgetService } from '../../../../../../main/webapp/app/entities/tipi-widget/tipi-widget.service';

describe('Component Tests', () => {

    describe('TipiWidget Management Delete Component', () => {
        let comp: TipiWidgetDeleteDialogComponent;
        let fixture: ComponentFixture<TipiWidgetDeleteDialogComponent>;
        let service: TipiWidgetService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TipiWidgetDeleteDialogComponent],
                providers: [
                    TipiWidgetService
                ]
            })
            .overrideTemplate(TipiWidgetDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipiWidgetDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipiWidgetService);
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
