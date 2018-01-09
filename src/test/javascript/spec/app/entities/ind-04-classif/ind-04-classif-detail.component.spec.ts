/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ind04ClassifDetailComponent } from '../../../../../../main/webapp/app/entities/ind-04-classif/ind-04-classif-detail.component';
import { Ind04ClassifService } from '../../../../../../main/webapp/app/entities/ind-04-classif/ind-04-classif.service';
import { Ind04Classif } from '../../../../../../main/webapp/app/entities/ind-04-classif/ind-04-classif.model';

describe('Component Tests', () => {

    describe('Ind04Classif Management Detail Component', () => {
        let comp: Ind04ClassifDetailComponent;
        let fixture: ComponentFixture<Ind04ClassifDetailComponent>;
        let service: Ind04ClassifService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ind04ClassifDetailComponent],
                providers: [
                    Ind04ClassifService
                ]
            })
            .overrideTemplate(Ind04ClassifDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ind04ClassifDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ind04ClassifService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Ind04Classif(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ind04Classif).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
