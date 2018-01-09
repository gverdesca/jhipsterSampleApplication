/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ba00EntitaComponent } from '../../../../../../main/webapp/app/entities/ba-00-entita/ba-00-entita.component';
import { Ba00EntitaService } from '../../../../../../main/webapp/app/entities/ba-00-entita/ba-00-entita.service';
import { Ba00Entita } from '../../../../../../main/webapp/app/entities/ba-00-entita/ba-00-entita.model';

describe('Component Tests', () => {

    describe('Ba00Entita Management Component', () => {
        let comp: Ba00EntitaComponent;
        let fixture: ComponentFixture<Ba00EntitaComponent>;
        let service: Ba00EntitaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ba00EntitaComponent],
                providers: [
                    Ba00EntitaService
                ]
            })
            .overrideTemplate(Ba00EntitaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ba00EntitaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ba00EntitaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Ba00Entita(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ba00Entitas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
