/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ObiettiviDetailComponent } from '../../../../../../main/webapp/app/entities/obiettivi/obiettivi-detail.component';
import { ObiettiviService } from '../../../../../../main/webapp/app/entities/obiettivi/obiettivi.service';
import { Obiettivi } from '../../../../../../main/webapp/app/entities/obiettivi/obiettivi.model';

describe('Component Tests', () => {

    describe('Obiettivi Management Detail Component', () => {
        let comp: ObiettiviDetailComponent;
        let fixture: ComponentFixture<ObiettiviDetailComponent>;
        let service: ObiettiviService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ObiettiviDetailComponent],
                providers: [
                    ObiettiviService
                ]
            })
            .overrideTemplate(ObiettiviDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ObiettiviDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ObiettiviService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Obiettivi(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.obiettivi).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
