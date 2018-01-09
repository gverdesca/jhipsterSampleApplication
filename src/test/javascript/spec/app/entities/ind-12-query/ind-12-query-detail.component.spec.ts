/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ind12QueryDetailComponent } from '../../../../../../main/webapp/app/entities/ind-12-query/ind-12-query-detail.component';
import { Ind12QueryService } from '../../../../../../main/webapp/app/entities/ind-12-query/ind-12-query.service';
import { Ind12Query } from '../../../../../../main/webapp/app/entities/ind-12-query/ind-12-query.model';

describe('Component Tests', () => {

    describe('Ind12Query Management Detail Component', () => {
        let comp: Ind12QueryDetailComponent;
        let fixture: ComponentFixture<Ind12QueryDetailComponent>;
        let service: Ind12QueryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ind12QueryDetailComponent],
                providers: [
                    Ind12QueryService
                ]
            })
            .overrideTemplate(Ind12QueryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ind12QueryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ind12QueryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Ind12Query(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ind12Query).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
