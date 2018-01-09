import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Ind01Indic } from './ind-01-indic.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class Ind01IndicService {

    private resourceUrl =  SERVER_API_URL + 'api/ind-01-indics';

    constructor(private http: Http) { }

    create(ind01Indic: Ind01Indic): Observable<Ind01Indic> {
        const copy = this.convert(ind01Indic);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ind01Indic: Ind01Indic): Observable<Ind01Indic> {
        const copy = this.convert(ind01Indic);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Ind01Indic> {
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
     * Convert a returned JSON object to Ind01Indic.
     */
    private convertItemFromServer(json: any): Ind01Indic {
        const entity: Ind01Indic = Object.assign(new Ind01Indic(), json);
        return entity;
    }

    /**
     * Convert a Ind01Indic to a JSON which can be sent to the server.
     */
    private convert(ind01Indic: Ind01Indic): Ind01Indic {
        const copy: Ind01Indic = Object.assign({}, ind01Indic);
        return copy;
    }
}
