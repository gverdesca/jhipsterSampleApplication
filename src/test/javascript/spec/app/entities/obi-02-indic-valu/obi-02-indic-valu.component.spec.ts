/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Obi02IndicValuComponent } from '../../../../../../main/webapp/app/entities/obi-02-indic-valu/obi-02-indic-valu.component';
import { Obi02IndicValuService } from '../../../../../../main/webapp/app/entities/obi-02-indic-valu/obi-02-indic-valu.service';
import { Obi02IndicValu } from '../../../../../../main/webapp/app/entities/obi-02-indic-valu/obi-02-indic-valu.model';

describe('Component Tests', () => {

    describe('Obi02IndicValu Management Component', () => {
        let comp: Obi02IndicValuComponent;
        let fixture: ComponentFixture<Obi02IndicValuComponent>;
        let service: Obi02IndicValuService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Obi02IndicValuComponent],
                providers: [
                    Obi02IndicValuService
                ]
            })
            .overrideTemplate(Obi02IndicValuComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Obi02IndicValuComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Obi02IndicValuService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Obi02IndicValu(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.obi02IndicValus[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
