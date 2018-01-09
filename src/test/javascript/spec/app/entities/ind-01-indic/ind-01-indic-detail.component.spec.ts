/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ind01IndicDetailComponent } from '../../../../../../main/webapp/app/entities/ind-01-indic/ind-01-indic-detail.component';
import { Ind01IndicService } from '../../../../../../main/webapp/app/entities/ind-01-indic/ind-01-indic.service';
import { Ind01Indic } from '../../../../../../main/webapp/app/entities/ind-01-indic/ind-01-indic.model';

describe('Component Tests', () => {

    describe('Ind01Indic Management Detail Component', () => {
        let comp: Ind01IndicDetailComponent;
        let fixture: ComponentFixture<Ind01IndicDetailComponent>;
        let service: Ind01IndicService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ind01IndicDetailComponent],
                providers: [
                    Ind01IndicService
                ]
            })
            .overrideTemplate(Ind01IndicDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ind01IndicDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ind01IndicService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Ind01Indic(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ind01Indic).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
