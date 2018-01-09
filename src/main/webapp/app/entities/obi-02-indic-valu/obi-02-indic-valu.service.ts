import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Obi02IndicValu } from './obi-02-indic-valu.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class Obi02IndicValuService {

    private resourceUrl =  SERVER_API_URL + 'api/obi-02-indic-valus';

    constructor(private http: Http) { }

    create(obi02IndicValu: Obi02IndicValu): Observable<Obi02IndicValu> {
        const copy = this.convert(obi02IndicValu);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(obi02IndicValu: Obi02IndicValu): Observable<Obi02IndicValu> {
        const copy = this.convert(obi02IndicValu);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Obi02IndicValu> {
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
     * Convert a returned JSON object to Obi02IndicValu.
     */
    private convertItemFromServer(json: any): Obi02IndicValu {
        const entity: Obi02IndicValu = Object.assign(new Obi02IndicValu(), json);
        return entity;
    }

    /**
     * Convert a Obi02IndicValu to a JSON which can be sent to the server.
     */
    private convert(obi02IndicValu: Obi02IndicValu): Obi02IndicValu {
        const copy: Obi02IndicValu = Object.assign({}, obi02IndicValu);
        return copy;
    }
}
