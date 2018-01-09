import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TipiWidget } from './tipi-widget.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipiWidgetService {

    private resourceUrl =  SERVER_API_URL + 'api/tipi-widgets';

    constructor(private http: Http) { }

    create(tipiWidget: TipiWidget): Observable<TipiWidget> {
        const copy = this.convert(tipiWidget);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipiWidget: TipiWidget): Observable<TipiWidget> {
        const copy = this.convert(tipiWidget);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TipiWidget> {
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
     * Convert a returned JSON object to TipiWidget.
     */
    private convertItemFromServer(json: any): TipiWidget {
        const entity: TipiWidget = Object.assign(new TipiWidget(), json);
        return entity;
    }

    /**
     * Convert a TipiWidget to a JSON which can be sent to the server.
     */
    private convert(tipiWidget: TipiWidget): TipiWidget {
        const copy: TipiWidget = Object.assign({}, tipiWidget);
        return copy;
    }
}
