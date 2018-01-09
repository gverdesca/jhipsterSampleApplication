/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { IndicValIntComponent } from '../../../../../../main/webapp/app/entities/indic-val-int/indic-val-int.component';
import { IndicValIntService } from '../../../../../../main/webapp/app/entities/indic-val-int/indic-val-int.service';
import { IndicValInt } from '../../../../../../main/webapp/app/entities/indic-val-int/indic-val-int.model';

describe('Component Tests', () => {

    describe('IndicValInt Management Component', () => {
        let comp: IndicValIntComponent;
        let fixture: ComponentFixture<IndicValIntComponent>;
        let service: IndicValIntService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [IndicValIntComponent],
                providers: [
                    IndicValIntService
                ]
            })
            .overrideTemplate(IndicValIntComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IndicValIntComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IndicValIntService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new IndicValInt(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.indicValInts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
