/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { IndicValIntDetailComponent } from '../../../../../../main/webapp/app/entities/indic-val-int/indic-val-int-detail.component';
import { IndicValIntService } from '../../../../../../main/webapp/app/entities/indic-val-int/indic-val-int.service';
import { IndicValInt } from '../../../../../../main/webapp/app/entities/indic-val-int/indic-val-int.model';

describe('Component Tests', () => {

    describe('IndicValInt Management Detail Component', () => {
        let comp: IndicValIntDetailComponent;
        let fixture: ComponentFixture<IndicValIntDetailComponent>;
        let service: IndicValIntService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [IndicValIntDetailComponent],
                providers: [
                    IndicValIntService
                ]
            })
            .overrideTemplate(IndicValIntDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IndicValIntDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IndicValIntService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new IndicValInt(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.indicValInt).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
