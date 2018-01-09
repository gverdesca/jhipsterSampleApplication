/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ind01IndicComponent } from '../../../../../../main/webapp/app/entities/ind-01-indic/ind-01-indic.component';
import { Ind01IndicService } from '../../../../../../main/webapp/app/entities/ind-01-indic/ind-01-indic.service';
import { Ind01Indic } from '../../../../../../main/webapp/app/entities/ind-01-indic/ind-01-indic.model';

describe('Component Tests', () => {

    describe('Ind01Indic Management Component', () => {
        let comp: Ind01IndicComponent;
        let fixture: ComponentFixture<Ind01IndicComponent>;
        let service: Ind01IndicService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ind01IndicComponent],
                providers: [
                    Ind01IndicService
                ]
            })
            .overrideTemplate(Ind01IndicComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ind01IndicComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ind01IndicService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Ind01Indic(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ind01Indics[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
