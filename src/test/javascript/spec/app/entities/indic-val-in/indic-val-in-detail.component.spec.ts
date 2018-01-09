/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { IndicValInDetailComponent } from '../../../../../../main/webapp/app/entities/indic-val-in/indic-val-in-detail.component';
import { IndicValInService } from '../../../../../../main/webapp/app/entities/indic-val-in/indic-val-in.service';
import { IndicValIn } from '../../../../../../main/webapp/app/entities/indic-val-in/indic-val-in.model';

describe('Component Tests', () => {

    describe('IndicValIn Management Detail Component', () => {
        let comp: IndicValInDetailComponent;
        let fixture: ComponentFixture<IndicValInDetailComponent>;
        let service: IndicValInService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [IndicValInDetailComponent],
                providers: [
                    IndicValInService
                ]
            })
            .overrideTemplate(IndicValInDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IndicValInDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IndicValInService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new IndicValIn(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.indicValIn).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
