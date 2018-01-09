/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ba11DshComponent } from '../../../../../../main/webapp/app/entities/ba-11-dsh/ba-11-dsh.component';
import { Ba11DshService } from '../../../../../../main/webapp/app/entities/ba-11-dsh/ba-11-dsh.service';
import { Ba11Dsh } from '../../../../../../main/webapp/app/entities/ba-11-dsh/ba-11-dsh.model';

describe('Component Tests', () => {

    describe('Ba11Dsh Management Component', () => {
        let comp: Ba11DshComponent;
        let fixture: ComponentFixture<Ba11DshComponent>;
        let service: Ba11DshService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ba11DshComponent],
                providers: [
                    Ba11DshService
                ]
            })
            .overrideTemplate(Ba11DshComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ba11DshComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ba11DshService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Ba11Dsh(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ba11Dshes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
