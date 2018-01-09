/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TipiWidgetComponent } from '../../../../../../main/webapp/app/entities/tipi-widget/tipi-widget.component';
import { TipiWidgetService } from '../../../../../../main/webapp/app/entities/tipi-widget/tipi-widget.service';
import { TipiWidget } from '../../../../../../main/webapp/app/entities/tipi-widget/tipi-widget.model';

describe('Component Tests', () => {

    describe('TipiWidget Management Component', () => {
        let comp: TipiWidgetComponent;
        let fixture: ComponentFixture<TipiWidgetComponent>;
        let service: TipiWidgetService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TipiWidgetComponent],
                providers: [
                    TipiWidgetService
                ]
            })
            .overrideTemplate(TipiWidgetComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipiWidgetComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipiWidgetService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TipiWidget(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tipiWidgets[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
