/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ba12WidgetDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/ba-12-widget/ba-12-widget-delete-dialog.component';
import { Ba12WidgetService } from '../../../../../../main/webapp/app/entities/ba-12-widget/ba-12-widget.service';

describe('Component Tests', () => {

    describe('Ba12Widget Management Delete Component', () => {
        let comp: Ba12WidgetDeleteDialogComponent;
        let fixture: ComponentFixture<Ba12WidgetDeleteDialogComponent>;
        let service: Ba12WidgetService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ba12WidgetDeleteDialogComponent],
                providers: [
                    Ba12WidgetService
                ]
            })
            .overrideTemplate(Ba12WidgetDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ba12WidgetDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ba12WidgetService);
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
