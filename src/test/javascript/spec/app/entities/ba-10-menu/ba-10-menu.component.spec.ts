/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Ba10MenuComponent } from '../../../../../../main/webapp/app/entities/ba-10-menu/ba-10-menu.component';
import { Ba10MenuService } from '../../../../../../main/webapp/app/entities/ba-10-menu/ba-10-menu.service';
import { Ba10Menu } from '../../../../../../main/webapp/app/entities/ba-10-menu/ba-10-menu.model';

describe('Component Tests', () => {

    describe('Ba10Menu Management Component', () => {
        let comp: Ba10MenuComponent;
        let fixture: ComponentFixture<Ba10MenuComponent>;
        let service: Ba10MenuService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Ba10MenuComponent],
                providers: [
                    Ba10MenuService
                ]
            })
            .overrideTemplate(Ba10MenuComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Ba10MenuComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Ba10MenuService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Ba10Menu(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ba10Menus[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
