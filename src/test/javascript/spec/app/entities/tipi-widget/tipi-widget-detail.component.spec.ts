/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TipiWidgetDetailComponent } from '../../../../../../main/webapp/app/entities/tipi-widget/tipi-widget-detail.component';
import { TipiWidgetService } from '../../../../../../main/webapp/app/entities/tipi-widget/tipi-widget.service';
import { TipiWidget } from '../../../../../../main/webapp/app/entities/tipi-widget/tipi-widget.model';

describe('Component Tests', () => {

    describe('TipiWidget Management Detail Component', () => {
        let comp: TipiWidgetDetailComponent;
        let fixture: ComponentFixture<TipiWidgetDetailComponent>;
        let service: TipiWidgetService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TipiWidgetDetailComponent],
                providers: [
                    TipiWidgetService
                ]
            })
            .overrideTemplate(TipiWidgetDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipiWidgetDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipiWidgetService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TipiWidget(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tipiWidget).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
