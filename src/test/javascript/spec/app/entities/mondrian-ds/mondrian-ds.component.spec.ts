/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { MondrianDsComponent } from '../../../../../../main/webapp/app/entities/mondrian-ds/mondrian-ds.component';
import { MondrianDsService } from '../../../../../../main/webapp/app/entities/mondrian-ds/mondrian-ds.service';
import { MondrianDs } from '../../../../../../main/webapp/app/entities/mondrian-ds/mondrian-ds.model';

describe('Component Tests', () => {

    describe('MondrianDs Management Component', () => {
        let comp: MondrianDsComponent;
        let fixture: ComponentFixture<MondrianDsComponent>;
        let service: MondrianDsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [MondrianDsComponent],
                providers: [
                    MondrianDsService
                ]
            })
            .overrideTemplate(MondrianDsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MondrianDsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MondrianDsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new MondrianDs(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.mondrianDs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
