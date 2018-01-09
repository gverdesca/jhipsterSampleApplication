/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ba01UtenteDetailComponent } from '../../../../../../main/webapp/app/entities/ba-01-utente/ba-01-utente-detail.component';
import { Ba01UtenteService } from '../../../../../../main/webapp/app/entities/ba-01-utente/ba-01-utente.service';
import { Ba01Utente } from '../../../../../../main/webapp/app/entities/ba-01-utente/ba-01-utente.model';

describe('Component Tests', () => {

    describe('Ba01Utente Management Detail Component', () => {
        let comp: Ba01UtenteDetailComponent;
        let fixture: ComponentFixture<Ba01UtenteDetailComponent>;
        let service: Ba01UtenteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ba01UtenteDetailComponent],
                providers: [
                    Ba01UtenteService
                ]
            })
            .overrideTemplate(Ba01UtenteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ba01UtenteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ba01UtenteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Ba01Utente(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ba01Utente).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
