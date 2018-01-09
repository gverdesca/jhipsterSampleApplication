/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ba12WidgetDetailComponent } from '../../../../../../main/webapp/app/entities/ba-12-widget/ba-12-widget-detail.component';
import { Ba12WidgetService } from '../../../../../../main/webapp/app/entities/ba-12-widget/ba-12-widget.service';
import { Ba12Widget } from '../../../../../../main/webapp/app/entities/ba-12-widget/ba-12-widget.model';

describe('Component Tests', () => {

    describe('Ba12Widget Management Detail Component', () => {
        let comp: Ba12WidgetDetailComponent;
        let fixture: ComponentFixture<Ba12WidgetDetailComponent>;
        let service: Ba12WidgetService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ba12WidgetDetailComponent],
                providers: [
                    Ba12WidgetService
                ]
            })
            .overrideTemplate(Ba12WidgetDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ba12WidgetDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ba12WidgetService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Ba12Widget(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ba12Widget).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
