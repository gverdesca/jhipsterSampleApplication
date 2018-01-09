/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ind04ClassifComponent } from '../../../../../../main/webapp/app/entities/ind-04-classif/ind-04-classif.component';
import { Ind04ClassifService } from '../../../../../../main/webapp/app/entities/ind-04-classif/ind-04-classif.service';
import { Ind04Classif } from '../../../../../../main/webapp/app/entities/ind-04-classif/ind-04-classif.model';

describe('Component Tests', () => {

    describe('Ind04Classif Management Component', () => {
        let comp: Ind04ClassifComponent;
        let fixture: ComponentFixture<Ind04ClassifComponent>;
        let service: Ind04ClassifService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ind04ClassifComponent],
                providers: [
                    Ind04ClassifService
                ]
            })
            .overrideTemplate(Ind04ClassifComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ind04ClassifComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ind04ClassifService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Ind04Classif(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ind04Classifs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
