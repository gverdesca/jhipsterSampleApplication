/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { IndicValuComponent } from '../../../../../../main/webapp/app/entities/indic-valu/indic-valu.component';
import { IndicValuService } from '../../../../../../main/webapp/app/entities/indic-valu/indic-valu.service';
import { IndicValu } from '../../../../../../main/webapp/app/entities/indic-valu/indic-valu.model';

describe('Component Tests', () => {

    describe('IndicValu Management Component', () => {
        let comp: IndicValuComponent;
        let fixture: ComponentFixture<IndicValuComponent>;
        let service: IndicValuService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [IndicValuComponent],
                providers: [
                    IndicValuService
                ]
            })
            .overrideTemplate(IndicValuComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IndicValuComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IndicValuService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new IndicValu(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.indicValus[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
