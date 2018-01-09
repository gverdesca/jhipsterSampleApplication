/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ObiettiviIndComponent } from '../../../../../../main/webapp/app/entities/obiettivi-ind/obiettivi-ind.component';
import { ObiettiviIndService } from '../../../../../../main/webapp/app/entities/obiettivi-ind/obiettivi-ind.service';
import { ObiettiviInd } from '../../../../../../main/webapp/app/entities/obiettivi-ind/obiettivi-ind.model';

describe('Component Tests', () => {

    describe('ObiettiviInd Management Component', () => {
        let comp: ObiettiviIndComponent;
        let fixture: ComponentFixture<ObiettiviIndComponent>;
        let service: ObiettiviIndService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ObiettiviIndComponent],
                providers: [
                    ObiettiviIndService
                ]
            })
            .overrideTemplate(ObiettiviIndComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ObiettiviIndComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ObiettiviIndService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ObiettiviInd(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.obiettiviInds[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
