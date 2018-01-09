/* tslint:disable max-line-length */
import { TestBed, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { ConnectionBackend, RequestOptions, BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { JhiDateUtils } from 'ng-jhipster';

import { Ba12WidgetService } from '../../../../../../main/webapp/app/entities/ba-12-widget/ba-12-widget.service';
import { Ba12Widget } from '../../../../../../main/webapp/app/entities/ba-12-widget/ba-12-widget.model';
import { SERVER_API_URL } from '../../../../../../main/webapp/app/app.constants';

describe('Service Tests', () => {

    describe('Ba12Widget Service', () => {
        let service: Ba12WidgetService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                providers: [
                    {
                        provide: ConnectionBackend,
                        useClass: MockBackend
                    },
                    {
                        provide: RequestOptions,
                        useClass: BaseRequestOptions
                    },
                    Http,
                    JhiDateUtils,
                    Ba12WidgetService
                ]
            });

            service = TestBed.get(Ba12WidgetService);

            this.backend = TestBed.get(ConnectionBackend) as MockBackend;
            this.backend.connections.subscribe((connection: any) => {
                this.lastConnection = connection;
            });
        }));

        describe('Service methods', () => {
            it('should call correct URL', () => {
                service.find(123).subscribe(() => {});

                expect(this.lastConnection).toBeDefined();

                const resourceUrl = SERVER_API_URL + 'api/ba-12-widgets';
                expect(this.lastConnection.request.url).toEqual(resourceUrl + '/' + 123);
            });
            it('should return Ba12Widget', () => {

                let entity: Ba12Widget;
                service.find(123).subscribe((_entity: Ba12Widget) => {
                    entity = _entity;
                });

                this.lastConnection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify({id: 123}),
                })));

                expect(entity).toBeDefined();
                expect(entity.id).toEqual(123);
            });

            it('should propagate not found response', () => {

                let error: any;
                service.find(123).subscribe(null, (_error: any) => {
                    error = _error;
                });

                this.lastConnection.mockError(new Response(new ResponseOptions({
                    status: 404,
                })));

                expect(error).toBeDefined();
                expect(error.status).toEqual(404);
            });
        });
    });

});
