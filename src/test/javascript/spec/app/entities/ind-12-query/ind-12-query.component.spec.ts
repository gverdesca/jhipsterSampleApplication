/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ind12QueryComponent } from '../../../../../../main/webapp/app/entities/ind-12-query/ind-12-query.component';
import { Ind12QueryService } from '../../../../../../main/webapp/app/entities/ind-12-query/ind-12-query.service';
import { Ind12Query } from '../../../../../../main/webapp/app/entities/ind-12-query/ind-12-query.model';

describe('Component Tests', () => {

    describe('Ind12Query Management Component', () => {
        let comp: Ind12QueryComponent;
        let fixture: ComponentFixture<Ind12QueryComponent>;
        let service: Ind12QueryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ind12QueryComponent],
                providers: [
                    Ind12QueryService
                ]
            })
            .overrideTemplate(Ind12QueryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ind12QueryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ind12QueryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Ind12Query(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ind12Queries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
