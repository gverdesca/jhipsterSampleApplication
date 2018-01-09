/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ba00EntitaDetailComponent } from '../../../../../../main/webapp/app/entities/ba-00-entita/ba-00-entita-detail.component';
import { Ba00EntitaService } from '../../../../../../main/webapp/app/entities/ba-00-entita/ba-00-entita.service';
import { Ba00Entita } from '../../../../../../main/webapp/app/entities/ba-00-entita/ba-00-entita.model';

describe('Component Tests', () => {

    describe('Ba00Entita Management Detail Component', () => {
        let comp: Ba00EntitaDetailComponent;
        let fixture: ComponentFixture<Ba00EntitaDetailComponent>;
        let service: Ba00EntitaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ba00EntitaDetailComponent],
                providers: [
                    Ba00EntitaService
                ]
            })
            .overrideTemplate(Ba00EntitaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ba00EntitaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ba00EntitaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Ba00Entita(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ba00Entita).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
