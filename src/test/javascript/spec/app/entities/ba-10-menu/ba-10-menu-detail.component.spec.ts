/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ba10MenuDetailComponent } from '../../../../../../main/webapp/app/entities/ba-10-menu/ba-10-menu-detail.component';
import { Ba10MenuService } from '../../../../../../main/webapp/app/entities/ba-10-menu/ba-10-menu.service';
import { Ba10Menu } from '../../../../../../main/webapp/app/entities/ba-10-menu/ba-10-menu.model';

describe('Component Tests', () => {

    describe('Ba10Menu Management Detail Component', () => {
        let comp: Ba10MenuDetailComponent;
        let fixture: ComponentFixture<Ba10MenuDetailComponent>;
        let service: Ba10MenuService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ba10MenuDetailComponent],
                providers: [
                    Ba10MenuService
                ]
            })
            .overrideTemplate(Ba10MenuDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ba10MenuDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ba10MenuService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Ba10Menu(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ba10Menu).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
