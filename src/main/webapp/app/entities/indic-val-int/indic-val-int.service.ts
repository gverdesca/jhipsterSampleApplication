import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { IndicValInt } from './indic-val-int.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class IndicValIntService {

    private resourceUrl =  SERVER_API_URL + 'api/indic-val-ints';

    constructor(private http: Http) { }

    create(indicValInt: IndicValInt): Observable<IndicValInt> {
        const copy = this.convert(indicValInt);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(indicValInt: IndicValInt): Observable<IndicValInt> {
        const copy = this.convert(indicValInt);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<IndicValInt> {
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
     * Convert a returned JSON object to IndicValInt.
     */
    private convertItemFromServer(json: any): IndicValInt {
        const entity: IndicValInt = Object.assign(new IndicValInt(), json);
        return entity;
    }

    /**
     * Convert a IndicValInt to a JSON which can be sent to the server.
     */
    private convert(indicValInt: IndicValInt): IndicValInt {
        const copy: IndicValInt = Object.assign({}, indicValInt);
        return copy;
    }
}
