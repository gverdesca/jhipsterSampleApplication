/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ba01UtenteComponent } from '../../../../../../main/webapp/app/entities/ba-01-utente/ba-01-utente.component';
import { Ba01UtenteService } from '../../../../../../main/webapp/app/entities/ba-01-utente/ba-01-utente.service';
import { Ba01Utente } from '../../../../../../main/webapp/app/entities/ba-01-utente/ba-01-utente.model';

describe('Component Tests', () => {

    describe('Ba01Utente Management Component', () => {
        let comp: Ba01UtenteComponent;
        let fixture: ComponentFixture<Ba01UtenteComponent>;
        let service: Ba01UtenteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ba01UtenteComponent],
                providers: [
                    Ba01UtenteService
                ]
            })
            .overrideTemplate(Ba01UtenteComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ba01UtenteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ba01UtenteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Ba01Utente(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ba01Utentes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
