/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ind02StdComponent } from '../../../../../../main/webapp/app/entities/ind-02-std/ind-02-std.component';
import { Ind02StdService } from '../../../../../../main/webapp/app/entities/ind-02-std/ind-02-std.service';
import { Ind02Std } from '../../../../../../main/webapp/app/entities/ind-02-std/ind-02-std.model';

describe('Component Tests', () => {

    describe('Ind02Std Management Component', () => {
        let comp: Ind02StdComponent;
        let fixture: ComponentFixture<Ind02StdComponent>;
        let service: Ind02StdService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ind02StdComponent],
                providers: [
                    Ind02StdService
                ]
            })
            .overrideTemplate(Ind02StdComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ind02StdComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ind02StdService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Ind02Std(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ind02Stds[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
