/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ba11DshDetailComponent } from '../../../../../../main/webapp/app/entities/ba-11-dsh/ba-11-dsh-detail.component';
import { Ba11DshService } from '../../../../../../main/webapp/app/entities/ba-11-dsh/ba-11-dsh.service';
import { Ba11Dsh } from '../../../../../../main/webapp/app/entities/ba-11-dsh/ba-11-dsh.model';

describe('Component Tests', () => {

    describe('Ba11Dsh Management Detail Component', () => {
        let comp: Ba11DshDetailComponent;
        let fixture: ComponentFixture<Ba11DshDetailComponent>;
        let service: Ba11DshService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ba11DshDetailComponent],
                providers: [
                    Ba11DshService
                ]
            })
            .overrideTemplate(Ba11DshDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ba11DshDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ba11DshService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Ba11Dsh(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ba11Dsh).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
