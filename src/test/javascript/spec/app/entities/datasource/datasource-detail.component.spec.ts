/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { DatasourceDetailComponent } from '../../../../../../main/webapp/app/entities/datasource/datasource-detail.component';
import { DatasourceService } from '../../../../../../main/webapp/app/entities/datasource/datasource.service';
import { Datasource } from '../../../../../../main/webapp/app/entities/datasource/datasource.model';

describe('Component Tests', () => {

    describe('Datasource Management Detail Component', () => {
        let comp: DatasourceDetailComponent;
        let fixture: ComponentFixture<DatasourceDetailComponent>;
        let service: DatasourceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [DatasourceDetailComponent],
                providers: [
                    DatasourceService
                ]
            })
            .overrideTemplate(DatasourceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DatasourceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DatasourceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Datasource(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.datasource).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
