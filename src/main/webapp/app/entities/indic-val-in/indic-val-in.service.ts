import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { IndicValIn } from './indic-val-in.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class IndicValInService {

    private resourceUrl =  SERVER_API_URL + 'api/indic-val-ins';

    constructor(private http: Http) { }

    create(indicValIn: IndicValIn): Observable<IndicValIn> {
        const copy = this.convert(indicValIn);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(indicValIn: IndicValIn): Observable<IndicValIn> {
        const copy = this.convert(indicValIn);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<IndicValIn> {
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
     * Convert a returned JSON object to IndicValIn.
     */
    private convertItemFromServer(json: any): IndicValIn {
        const entity: IndicValIn = Object.assign(new IndicValIn(), json);
        return entity;
    }

    /**
     * Convert a IndicValIn to a JSON which can be sent to the server.
     */
    private convert(indicValIn: IndicValIn): IndicValIn {
        const copy: IndicValIn = Object.assign({}, indicValIn);
        return copy;
    }
}
