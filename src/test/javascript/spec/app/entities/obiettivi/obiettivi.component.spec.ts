/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ObiettiviComponent } from '../../../../../../main/webapp/app/entities/obiettivi/obiettivi.component';
import { ObiettiviService } from '../../../../../../main/webapp/app/entities/obiettivi/obiettivi.service';
import { Obiettivi } from '../../../../../../main/webapp/app/entities/obiettivi/obiettivi.model';

describe('Component Tests', () => {

    describe('Obiettivi Management Component', () => {
        let comp: ObiettiviComponent;
        let fixture: ComponentFixture<ObiettiviComponent>;
        let service: ObiettiviService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ObiettiviComponent],
                providers: [
                    ObiettiviService
                ]
            })
            .overrideTemplate(ObiettiviComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ObiettiviComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ObiettiviService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Obiettivi(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.obiettivis[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
