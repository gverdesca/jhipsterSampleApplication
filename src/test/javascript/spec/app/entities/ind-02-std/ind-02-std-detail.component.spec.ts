/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ind02StdDetailComponent } from '../../../../../../main/webapp/app/entities/ind-02-std/ind-02-std-detail.component';
import { Ind02StdService } from '../../../../../../main/webapp/app/entities/ind-02-std/ind-02-std.service';
import { Ind02Std } from '../../../../../../main/webapp/app/entities/ind-02-std/ind-02-std.model';

describe('Component Tests', () => {

    describe('Ind02Std Management Detail Component', () => {
        let comp: Ind02StdDetailComponent;
        let fixture: ComponentFixture<Ind02StdDetailComponent>;
        let service: Ind02StdService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ind02StdDetailComponent],
                providers: [
                    Ind02StdService
                ]
            })
            .overrideTemplate(Ind02StdDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ind02StdDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ind02StdService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Ind02Std(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ind02Std).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
