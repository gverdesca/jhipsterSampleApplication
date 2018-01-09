/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { MondrianDsDetailComponent } from '../../../../../../main/webapp/app/entities/mondrian-ds/mondrian-ds-detail.component';
import { MondrianDsService } from '../../../../../../main/webapp/app/entities/mondrian-ds/mondrian-ds.service';
import { MondrianDs } from '../../../../../../main/webapp/app/entities/mondrian-ds/mondrian-ds.model';

describe('Component Tests', () => {

    describe('MondrianDs Management Detail Component', () => {
        let comp: MondrianDsDetailComponent;
        let fixture: ComponentFixture<MondrianDsDetailComponent>;
        let service: MondrianDsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [MondrianDsDetailComponent],
                providers: [
                    MondrianDsService
                ]
            })
            .overrideTemplate(MondrianDsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MondrianDsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MondrianDsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new MondrianDs(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.mondrianDs).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
