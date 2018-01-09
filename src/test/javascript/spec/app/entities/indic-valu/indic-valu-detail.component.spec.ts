/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { IndicValuDetailComponent } from '../../../../../../main/webapp/app/entities/indic-valu/indic-valu-detail.component';
import { IndicValuService } from '../../../../../../main/webapp/app/entities/indic-valu/indic-valu.service';
import { IndicValu } from '../../../../../../main/webapp/app/entities/indic-valu/indic-valu.model';

describe('Component Tests', () => {

    describe('IndicValu Management Detail Component', () => {
        let comp: IndicValuDetailComponent;
        let fixture: ComponentFixture<IndicValuDetailComponent>;
        let service: IndicValuService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [IndicValuDetailComponent],
                providers: [
                    IndicValuService
                ]
            })
            .overrideTemplate(IndicValuDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IndicValuDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IndicValuService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new IndicValu(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.indicValu).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
