/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Obi02IndicValuDetailComponent } from '../../../../../../main/webapp/app/entities/obi-02-indic-valu/obi-02-indic-valu-detail.component';
import { Obi02IndicValuService } from '../../../../../../main/webapp/app/entities/obi-02-indic-valu/obi-02-indic-valu.service';
import { Obi02IndicValu } from '../../../../../../main/webapp/app/entities/obi-02-indic-valu/obi-02-indic-valu.model';

describe('Component Tests', () => {

    describe('Obi02IndicValu Management Detail Component', () => {
        let comp: Obi02IndicValuDetailComponent;
        let fixture: ComponentFixture<Obi02IndicValuDetailComponent>;
        let service: Obi02IndicValuService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Obi02IndicValuDetailComponent],
                providers: [
                    Obi02IndicValuService
                ]
            })
            .overrideTemplate(Obi02IndicValuDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Obi02IndicValuDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Obi02IndicValuService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Obi02IndicValu(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.obi02IndicValu).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
