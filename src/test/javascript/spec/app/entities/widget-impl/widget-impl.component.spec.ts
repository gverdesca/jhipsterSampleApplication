/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { WidgetImplComponent } from '../../../../../../main/webapp/app/entities/widget-impl/widget-impl.component';
import { WidgetImplService } from '../../../../../../main/webapp/app/entities/widget-impl/widget-impl.service';
import { WidgetImpl } from '../../../../../../main/webapp/app/entities/widget-impl/widget-impl.model';

describe('Component Tests', () => {

    describe('WidgetImpl Management Component', () => {
        let comp: WidgetImplComponent;
        let fixture: ComponentFixture<WidgetImplComponent>;
        let service: WidgetImplService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [WidgetImplComponent],
                providers: [
                    WidgetImplService
                ]
            })
            .overrideTemplate(WidgetImplComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WidgetImplComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WidgetImplService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new WidgetImpl(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.widgetImpls[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
