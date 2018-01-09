/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ObiettiviIndDetailComponent } from '../../../../../../main/webapp/app/entities/obiettivi-ind/obiettivi-ind-detail.component';
import { ObiettiviIndService } from '../../../../../../main/webapp/app/entities/obiettivi-ind/obiettivi-ind.service';
import { ObiettiviInd } from '../../../../../../main/webapp/app/entities/obiettivi-ind/obiettivi-ind.model';

describe('Component Tests', () => {

    describe('ObiettiviInd Management Detail Component', () => {
        let comp: ObiettiviIndDetailComponent;
        let fixture: ComponentFixture<ObiettiviIndDetailComponent>;
        let service: ObiettiviIndService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ObiettiviIndDetailComponent],
                providers: [
                    ObiettiviIndService
                ]
            })
            .overrideTemplate(ObiettiviIndDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ObiettiviIndDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ObiettiviIndService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ObiettiviInd(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.obiettiviInd).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
