/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { DatasourceComponent } from '../../../../../../main/webapp/app/entities/datasource/datasource.component';
import { DatasourceService } from '../../../../../../main/webapp/app/entities/datasource/datasource.service';
import { Datasource } from '../../../../../../main/webapp/app/entities/datasource/datasource.model';

describe('Component Tests', () => {

    describe('Datasource Management Component', () => {
        let comp: DatasourceComponent;
        let fixture: ComponentFixture<DatasourceComponent>;
        let service: DatasourceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [DatasourceComponent],
                providers: [
                    DatasourceService
                ]
            })
            .overrideTemplate(DatasourceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DatasourceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DatasourceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Datasource(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.datasources[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
