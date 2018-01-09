/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { WidgetImplDetailComponent } from '../../../../../../main/webapp/app/entities/widget-impl/widget-impl-detail.component';
import { WidgetImplService } from '../../../../../../main/webapp/app/entities/widget-impl/widget-impl.service';
import { WidgetImpl } from '../../../../../../main/webapp/app/entities/widget-impl/widget-impl.model';

describe('Component Tests', () => {

    describe('WidgetImpl Management Detail Component', () => {
        let comp: WidgetImplDetailComponent;
        let fixture: ComponentFixture<WidgetImplDetailComponent>;
        let service: WidgetImplService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [WidgetImplDetailComponent],
                providers: [
                    WidgetImplService
                ]
            })
            .overrideTemplate(WidgetImplDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WidgetImplDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WidgetImplService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new WidgetImpl(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.widgetImpl).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
