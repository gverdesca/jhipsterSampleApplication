/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { IndicValInComponent } from '../../../../../../main/webapp/app/entities/indic-val-in/indic-val-in.component';
import { IndicValInService } from '../../../../../../main/webapp/app/entities/indic-val-in/indic-val-in.service';
import { IndicValIn } from '../../../../../../main/webapp/app/entities/indic-val-in/indic-val-in.model';

describe('Component Tests', () => {

    describe('IndicValIn Management Component', () => {
        let comp: IndicValInComponent;
        let fixture: ComponentFixture<IndicValInComponent>;
        let service: IndicValInService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [IndicValInComponent],
                providers: [
                    IndicValInService
                ]
            })
            .overrideTemplate(IndicValInComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IndicValInComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IndicValInService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new IndicValIn(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.indicValIns[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
