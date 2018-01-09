/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ba12WidgetComponent } from '../../../../../../main/webapp/app/entities/ba-12-widget/ba-12-widget.component';
import { Ba12WidgetService } from '../../../../../../main/webapp/app/entities/ba-12-widget/ba-12-widget.service';
import { Ba12Widget } from '../../../../../../main/webapp/app/entities/ba-12-widget/ba-12-widget.model';

describe('Component Tests', () => {

    describe('Ba12Widget Management Component', () => {
        let comp: Ba12WidgetComponent;
        let fixture: ComponentFixture<Ba12WidgetComponent>;
        let service: Ba12WidgetService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ba12WidgetComponent],
                providers: [
                    Ba12WidgetService
                ]
            })
            .overrideTemplate(Ba12WidgetComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ba12WidgetComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ba12WidgetService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Ba12Widget(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ba12Widgets[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
