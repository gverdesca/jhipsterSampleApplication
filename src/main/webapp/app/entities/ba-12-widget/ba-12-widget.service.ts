import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Ba12Widget } from './ba-12-widget.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class Ba12WidgetService {

    private resourceUrl =  SERVER_API_URL + 'api/ba-12-widgets';

    constructor(private http: Http) { }

    create(ba12Widget: Ba12Widget): Observable<Ba12Widget> {
        const copy = this.convert(ba12Widget);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ba12Widget: Ba12Widget): Observable<Ba12Widget> {
        const copy = this.convert(ba12Widget);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Ba12Widget> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Ba12Widget.
     */
    private convertItemFromServer(json: any): Ba12Widget {
        const entity: Ba12Widget = Object.assign(new Ba12Widget(), json);
        return entity;
    }

    /**
     * Convert a Ba12Widget to a JSON which can be sent to the server.
     */
    private convert(ba12Widget: Ba12Widget): Ba12Widget {
        const copy: Ba12Widget = Object.assign({}, ba12Widget);
        return copy;
    }
}
